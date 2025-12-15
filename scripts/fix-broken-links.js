#!/usr/bin/env node
/**
 * Broken Link Fixer for GoodChristmasIdeas.com
 *
 * This script:
 * 1. Scans all HTML files for Amazon product links
 * 2. Validates each ASIN against Amazon (with rate limiting to avoid blocks)
 * 3. For confirmed broken links: replaces with Amazon search URL (keeps affiliate tag)
 * 4. Generates an email report of all changes
 *
 * Usage: node scripts/fix-broken-links.js [--dry-run] [--verbose]
 *
 * Options:
 *   --dry-run   Check links but don't modify files
 *   --verbose   Show all checks, not just problems
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const SITE_DIR = path.join(__dirname, '..');
const AFFILIATE_TAG = 'memoofadomeen-20';
const REPORT_FILE = path.join(SITE_DIR, 'broken-links-report.txt');

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VERBOSE = args.includes('--verbose');

// Track all changes for reporting
const report = {
    scannedFiles: 0,
    totalASINs: 0,
    validASINs: 0,
    brokenASINs: [],
    fixedLinks: [],
    skippedASINs: [],
    errors: []
};

/**
 * Extract product name from HTML near the ASIN
 */
function extractProductName(html, asin) {
    // Try to find product name in alt text
    const altMatch = html.match(new RegExp(`ASIN=${asin}[^>]*alt="([^"]+)"`, 'i'));
    if (altMatch) return altMatch[1];

    // Try to find in nearby h3 tag (before ASIN)
    const h3BeforeMatch = html.match(new RegExp(`<h3[^>]*>([^<]+)</h3>[\\s\\S]{0,1000}${asin}`, 'i'));
    if (h3BeforeMatch) return h3BeforeMatch[1].trim();

    // Try to find h3 after the ASIN
    const h3AfterMatch = html.match(new RegExp(`${asin}[\\s\\S]{0,500}<h3[^>]*>([^<]+)</h3>`, 'i'));
    if (h3AfterMatch) return h3AfterMatch[1].trim();

    // Try title attribute
    const titleMatch = html.match(new RegExp(`${asin}[\\s\\S]{0,300}title="([^"]+)"`, 'i'));
    if (titleMatch) return titleMatch[1];

    return null;
}

/**
 * Create Amazon search URL with affiliate tag
 */
function createSearchUrl(productName) {
    // Clean up the product name for search
    const cleanName = productName
        .replace(/\s*-\s*\$[\d,]+/g, '')  // Remove price
        .replace(/[^\w\s]/g, ' ')          // Remove special chars
        .replace(/\s+/g, ' ')              // Normalize spaces
        .trim();
    const searchTerms = encodeURIComponent(cleanName);
    return `https://www.amazon.com/s?k=${searchTerms}&tag=${AFFILIATE_TAG}`;
}

/**
 * Check if an ASIN is valid using a more reliable method
 * Returns: { valid: boolean, statusCode: number|string, redirect: boolean }
 */
async function checkASIN(asin) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.amazon.com',
            path: `/dp/${asin}`,
            method: 'GET',  // Use GET instead of HEAD for more reliable results
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'identity',
                'Connection': 'keep-alive'
            },
            timeout: 15000
        };

        const req = https.request(options, (res) => {
            let body = '';

            // Only read a small portion to check for 404 indicators
            res.on('data', chunk => {
                body += chunk;
                if (body.length > 50000) {
                    req.destroy(); // Stop reading if we have enough
                }
            });

            res.on('end', () => {
                // Check various indicators of a valid/invalid product
                const statusCode = res.statusCode;

                // Obvious valid cases
                if (statusCode === 200) {
                    // Check if it's actually a product page or a "dog page" (404)
                    const is404Page = body.includes("we couldn't find that page") ||
                                     body.includes("looking for something") ||
                                     body.includes("Page Not Found") ||
                                     body.includes("UNOE") || // Amazon's 404 dog
                                     body.includes("the Web address you entered is not");

                    resolve({
                        asin,
                        valid: !is404Page,
                        statusCode: is404Page ? '404-soft' : 200,
                        redirect: false
                    });
                    return;
                }

                // Redirects are usually valid (product exists but redirected)
                if (statusCode === 301 || statusCode === 302 || statusCode === 303 || statusCode === 307) {
                    resolve({ asin, valid: true, statusCode, redirect: true });
                    return;
                }

                // 404 is definitely broken
                if (statusCode === 404) {
                    resolve({ asin, valid: false, statusCode, redirect: false });
                    return;
                }

                // 503 or other server errors - don't trust, skip
                if (statusCode >= 500) {
                    resolve({ asin, valid: true, statusCode, redirect: false, skipped: true });
                    return;
                }

                // Other 4xx - likely broken
                if (statusCode >= 400) {
                    resolve({ asin, valid: false, statusCode, redirect: false });
                    return;
                }

                // Default: assume valid to avoid false positives
                resolve({ asin, valid: true, statusCode, redirect: false });
            });
        });

        req.on('error', (err) => {
            // Network error - don't mark as broken, skip
            resolve({ asin, valid: true, statusCode: 'NETWORK_ERROR', skipped: true, error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            // Timeout - don't mark as broken, skip
            resolve({ asin, valid: true, statusCode: 'TIMEOUT', skipped: true });
        });

        req.end();
    });
}

/**
 * Delay helper with jitter to avoid pattern detection
 */
function delay(ms) {
    const jitter = Math.random() * 500; // Add 0-500ms random jitter
    return new Promise(resolve => setTimeout(resolve, ms + jitter));
}

/**
 * Process a single HTML file
 */
async function processFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    const relativePath = path.relative(SITE_DIR, filePath);

    // Find all Amazon product links (direct dp links only, not search URLs)
    const asinMatches = [...html.matchAll(/amazon\.com\/dp\/([A-Z0-9]{10})/g)];
    const uniqueASINs = [...new Set(asinMatches.map(m => m[1]))];

    if (uniqueASINs.length === 0) return false;

    report.totalASINs += uniqueASINs.length;

    for (const asin of uniqueASINs) {
        const result = await checkASIN(asin);

        // Long delay between requests to avoid rate limiting
        await delay(2000);

        if (result.skipped) {
            report.skippedASINs.push({
                asin,
                file: relativePath,
                reason: result.statusCode
            });
            if (VERBOSE) console.log(`  ⏭️  ${asin} - Skipped (${result.statusCode})`);
            continue;
        }

        if (result.valid) {
            report.validASINs++;
            if (VERBOSE) console.log(`  ✅ ${asin} - Valid`);
            continue;
        }

        // ASIN is broken - try to fix it
        const productName = extractProductName(html, asin);

        if (productName) {
            const searchUrl = createSearchUrl(productName);
            const oldUrlPattern = new RegExp(
                `https://www\\.amazon\\.com/dp/${asin}\\?tag=[^"\\s]+`,
                'g'
            );

            if (!DRY_RUN) {
                html = html.replace(oldUrlPattern, searchUrl);
            }

            report.brokenASINs.push({
                asin,
                productName,
                statusCode: result.statusCode,
                file: relativePath
            });

            report.fixedLinks.push({
                file: relativePath,
                productName,
                oldUrl: `https://www.amazon.com/dp/${asin}`,
                newUrl: searchUrl
            });

            console.log(`  ⚠️  ${asin} (${productName}) → Search URL`);
        } else {
            report.errors.push({
                asin,
                file: relativePath,
                error: 'Could not extract product name'
            });
            console.log(`  ❌ ${asin} - Broken but could not extract product name`);
        }
    }

    // Only write if changes were made
    if (!DRY_RUN && html !== originalHtml) {
        fs.writeFileSync(filePath, html);
        return true;
    }

    return false;
}

/**
 * Scan directory for HTML files
 */
function getHtmlFiles(dir) {
    const files = [];

    function scan(directory) {
        const items = fs.readdirSync(directory);

        for (const item of items) {
            const fullPath = path.join(directory, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'scripts') {
                scan(fullPath);
            } else if (item.endsWith('.html')) {
                files.push(fullPath);
            }
        }
    }

    scan(dir);
    return files;
}

/**
 * Generate report
 */
function generateReport() {
    const timestamp = new Date().toISOString();

    let reportText = `
========================================
GoodChristmasIdeas.com - Link Report
Generated: ${timestamp}
Mode: ${DRY_RUN ? 'DRY RUN (no changes made)' : 'LIVE'}
========================================

SUMMARY
-------
Files scanned: ${report.scannedFiles}
Total ASINs checked: ${report.totalASINs}
Valid links: ${report.validASINs}
Broken links found: ${report.brokenASINs.length}
Links fixed: ${DRY_RUN ? 0 : report.fixedLinks.length}
Skipped (server errors): ${report.skippedASINs.length}
Errors: ${report.errors.length}

`;

    if (report.fixedLinks.length > 0) {
        reportText += `
${DRY_RUN ? 'WOULD FIX' : 'FIXED'} LINKS (Converted to Search URLs)
--------------------------------------
`;
        for (const fix of report.fixedLinks) {
            reportText += `
Product: ${fix.productName}
File: ${fix.file}
Old URL: ${fix.oldUrl}
New URL: ${fix.newUrl}
`;
        }
    }

    if (report.errors.length > 0) {
        reportText += `
ERRORS (Manual Review Needed)
-----------------------------
`;
        for (const err of report.errors) {
            reportText += `ASIN: ${err.asin} | File: ${err.file} | Error: ${err.error}\n`;
        }
    }

    if (report.skippedASINs.length > 0 && VERBOSE) {
        reportText += `
SKIPPED (Server Issues - Will Retry)
------------------------------------
`;
        for (const skip of report.skippedASINs) {
            reportText += `ASIN: ${skip.asin} | File: ${skip.file} | Reason: ${skip.reason}\n`;
        }
    }

    reportText += `
========================================
${report.brokenASINs.length > 0 ? '⚠️  Action: Review the converted search links' : '✅ All product links appear valid'}
========================================
`;

    return reportText;
}

/**
 * Main function
 */
async function main() {
    console.log('🎄 GoodChristmasIdeas.com - Broken Link Fixer\n');

    if (DRY_RUN) console.log('🔍 DRY RUN MODE - No files will be modified\n');

    console.log('Scanning for HTML files...\n');

    const htmlFiles = getHtmlFiles(SITE_DIR);
    report.scannedFiles = htmlFiles.length;

    console.log(`Found ${htmlFiles.length} HTML files to process.`);
    console.log('Validating Amazon links (this may take several minutes due to rate limiting)...\n');

    let modifiedCount = 0;

    for (const file of htmlFiles) {
        const relativePath = path.relative(SITE_DIR, file);
        console.log(`Processing: ${relativePath}`);

        try {
            const wasModified = await processFile(file);
            if (wasModified) modifiedCount++;
        } catch (err) {
            console.log(`  ❌ Error processing file: ${err.message}`);
            report.errors.push({ file: relativePath, error: err.message });
        }
    }

    // Generate report
    const reportText = generateReport();

    console.log('\n' + '='.repeat(50));
    console.log(reportText);

    // Save report to file
    fs.writeFileSync(REPORT_FILE, reportText);
    console.log(`\nReport saved to: ${REPORT_FILE}`);

    // Create JSON summary
    const summaryFile = path.join(SITE_DIR, 'broken-links-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify({
        timestamp: new Date().toISOString(),
        dryRun: DRY_RUN,
        brokenCount: report.brokenASINs.length,
        fixedCount: DRY_RUN ? 0 : report.fixedLinks.length,
        errorCount: report.errors.length,
        skippedCount: report.skippedASINs.length,
        details: report
    }, null, 2));

    // Exit code for CI/CD
    if (report.brokenASINs.length > 0) {
        console.log('\n⚠️  Broken links were found' + (DRY_RUN ? '' : ' and converted to search URLs.'));
        process.exit(1);
    } else {
        console.log('\n✅ All product links are valid!\n');
        process.exit(0);
    }
}

// Run
main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
