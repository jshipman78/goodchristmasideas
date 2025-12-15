# GoodChristmasIdeas.com - Automation Scripts

## Overview

These scripts automatically validate and fix broken Amazon product links on the website.

When a product link is broken (discontinued, out of stock, etc.), the system:
1. Detects the broken link
2. Extracts the product name
3. Converts it to an Amazon search URL with your affiliate tag
4. Sends you an email alert

This ensures you never lose affiliate revenue from dead links.

---

## Scripts

### `validate-products.js`
Basic validation script that checks all Amazon ASINs and reports broken links.

```bash
node scripts/validate-products.js
```

### `fix-broken-links.js`
Advanced script that validates AND auto-fixes broken links by converting them to search URLs.

```bash
node scripts/fix-broken-links.js
```

---

## GitHub Actions Automation

The workflow runs daily at 6 AM UTC and:
1. Scans all product links
2. Auto-fixes broken links (converts to search URLs)
3. Commits and pushes changes
4. Sends email notification

### Setup Email Alerts

To enable email notifications, add these secrets to your GitHub repository:

1. Go to: **Repository → Settings → Secrets and variables → Actions**
2. Add these secrets:

| Secret Name | Value | Notes |
|-------------|-------|-------|
| `ALERT_EMAIL` | your@email.com | Where to send alerts |
| `EMAIL_USERNAME` | sender@gmail.com | Gmail account for sending |
| `EMAIL_PASSWORD` | xxxx xxxx xxxx xxxx | Gmail App Password (not regular password) |

### Creating a Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (required)
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Name it "GoodChristmasIdeas Bot"
6. Copy the 16-character password
7. Use this as `EMAIL_PASSWORD` in GitHub Secrets

---

## How Search URL Fallback Works

When a product link breaks:

**Before (broken):**
```
https://www.amazon.com/dp/B00BROKEN?tag=memoofadomeen-20
```

**After (working search):**
```
https://www.amazon.com/s?k=YETI+Rambler+Tumbler&tag=memoofadomeen-20
```

The user clicks, searches Amazon with your affiliate tag intact, and you still earn commission on any purchase.

---

## Manual Run

To run the validation locally:

```bash
cd /Users/joeshipman/goodchristmasideas
node scripts/fix-broken-links.js
```

This will:
- Scan all HTML files
- Check every Amazon link
- Fix broken ones
- Generate `broken-links-report.txt`

Review the changes with `git diff` before committing.

---

## Files Generated

| File | Purpose |
|------|---------|
| `broken-links-report.txt` | Human-readable report of all changes |
| `broken-links-summary.json` | Machine-readable summary for automation |

---

## Troubleshooting

### "Could not extract product name"
The script couldn't find the product name near the ASIN. Manually review the file and fix.

### Rate limiting
If Amazon blocks requests, the script has built-in delays. Increase the delay in `fix-broken-links.js` if needed:
```javascript
await delay(500); // Increase to 1000 or more
```

### Email not sending
1. Check GitHub Actions logs for errors
2. Verify secrets are set correctly
3. Ensure Gmail App Password is correct (not regular password)
4. Check spam folder

---

## Tech Focus

Based on team discussion, Tech deals should be highlighted. Consider:
- Running validation more frequently for `/gifts/tech/` and `/guides/best-tech-gifts/`
- Adding deal badges to tech products when PA-API becomes available
- Creating a dedicated "Tech Deals" section on the homepage
