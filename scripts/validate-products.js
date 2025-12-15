#!/usr/bin/env node
/**
 * Product Validation Script for GoodChristmasIdeas.com
 *
 * This script:
 * 1. Extracts all Amazon ASINs from HTML files
 * 2. Validates each ASIN is still active on Amazon
 * 3. Reports broken links that need replacement
 *
 * Usage: node scripts/validate-products.js
 *
 * For full automation with prices/deals, you'll need Amazon PA-API access.
 * See: https://webservices.amazon.com/paapi5/documentation/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const SITE_DIR = path.join(__dirname, '..');
const AFFILIATE_TAG = 'memoofadomeen-20';

// Extract ASINs from HTML files
function extractASINs(directory) {
    const asins = new Map(); // ASIN -> [files]

    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'scripts') {
                scanDirectory(filePath);
            } else if (file.endsWith('.html')) {
                const content = fs.readFileSync(filePath, 'utf8');
                const matches = content.matchAll(/amazon\.com\/dp\/([A-Z0-9]{10})/g);

                for (const match of matches) {
                    const asin = match[1];
                    if (!asins.has(asin)) {
                        asins.set(asin, []);
                    }
                    const relativePath = path.relative(SITE_DIR, filePath);
                    if (!asins.get(asin).includes(relativePath)) {
                        asins.get(asin).push(relativePath);
                    }
                }
            }
        }
    }

    scanDirectory(directory);
    return asins;
}

// Check if an ASIN is valid (simple HTTP check)
async function checkASIN(asin) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.amazon.com',
            path: `/dp/${asin}`,
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; GoodChristmasIdeasBot/1.0)'
            },
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            // 200 = valid, 404 = not found, 301/302 = redirect (usually valid)
            resolve({
                asin,
                valid: res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302,
                statusCode: res.statusCode
            });
        });

        req.on('error', () => {
            resolve({ asin, valid: false, statusCode: 'ERROR' });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ asin, valid: false, statusCode: 'TIMEOUT' });
        });

        req.end();
    });
}

// Add delay between requests to avoid rate limiting
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Main validation function
async function validateAllProducts() {
    console.log('🎄 GoodChristmasIdeas.com - Product Validator\n');
    console.log('Scanning for Amazon ASINs...\n');

    const asins = extractASINs(SITE_DIR);
    console.log(`Found ${asins.size} unique ASINs across the site.\n`);

    const broken = [];
    const valid = [];
    let checked = 0;

    console.log('Validating ASINs (this may take a few minutes)...\n');

    for (const [asin, files] of asins) {
        const result = await checkASIN(asin);
        checked++;

        if (result.valid) {
            valid.push({ asin, files });
            process.stdout.write(`✓ ${asin} (${checked}/${asins.size})\r`);
        } else {
            broken.push({ asin, files, statusCode: result.statusCode });
            console.log(`✗ ${asin} - BROKEN (HTTP ${result.statusCode})`);
        }

        // Small delay to avoid rate limiting
        await delay(500);
    }

    console.log('\n\n========== VALIDATION REPORT ==========\n');
    console.log(`Total ASINs: ${asins.size}`);
    console.log(`Valid: ${valid.length}`);
    console.log(`Broken: ${broken.length}`);

    if (broken.length > 0) {
        console.log('\n🚨 BROKEN LINKS REQUIRING ATTENTION:\n');

        for (const item of broken) {
            console.log(`ASIN: ${item.asin} (HTTP ${item.statusCode})`);
            console.log(`  Amazon URL: https://www.amazon.com/dp/${item.asin}?tag=${AFFILIATE_TAG}`);
            console.log(`  Found in:`);
            for (const file of item.files) {
                console.log(`    - ${file}`);
            }
            console.log('');
        }

        // Exit with error code if broken links found (useful for CI/CD)
        process.exit(1);
    } else {
        console.log('\n✅ All product links are valid!\n');
        process.exit(0);
    }
}

// Run validation
validateAllProducts().catch(console.error);
