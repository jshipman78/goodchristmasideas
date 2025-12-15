# GoodChristmasIdeas.com - Team Meeting Recommendations

**Date:** December 15, 2025
**Prepared for:** Mary and Team

---

## Executive Summary

The website had several issues affecting user experience and revenue potential. Here's the current status:

| Issue | Status |
|-------|--------|
| 7 broken Amazon product links | ✅ **FIXED** |
| Outdated "December 2024" dates | ✅ **FIXED** |
| No deal/discount tracking | 🔶 Needs PA-API |
| No automated content refresh | 🔶 Workflow ready, needs activation |
| cPanel deployment sync issues | ⚠️ Needs manual fix (delete & re-clone) |

---

## Completed Fixes

### ✅ Broken Product Links - RESOLVED

All 7 invalid Amazon ASINs have been replaced with working alternatives:

| Product | Old (Broken) | New (Valid) |
|---------|--------------|-------------|
| Burt's Bees Lip Balm 4-Pack | B00076TORC | B0054LHI5A |
| Whiskey Flask | B00CI2PXAE | B00Q87013U |
| Wet Brush Detangler | B07FJB9MVW | B005LPN8R6 |
| Giant Coffee Mug 64oz | B07MCQZQR4 | B00WKVQ2F4 |
| Hydro Flask Water Bottle | B083GC4RND | B083GC98D8 |
| L.L.Bean Wicked Good Slippers | B08HCWB9JD | B0FHDYCGQH |
| Apple Watch SE | B0CHXCSP15 | B0DGJ736JM |

**Files updated:** 10 pages across `/gifts/` and `/guides/`

### ✅ Outdated Dates - RESOLVED

All "Updated: December 2024" references changed to "December 2025" across 12 guide pages.

---

## Pending Action: cPanel Deployment

**Problem:** Git branches have diverged, blocking updates.

**Solution (5 minutes):**
1. Log into cPanel
2. Go to **Git Version Control**
3. **Delete** the existing `goodchristmasideas` repository
4. **Create** new repository, clone from: `https://github.com/jshipman78/goodchristmasideas.git`
5. Deploy to `public_html`

---

## Automated Daily Update System

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    DAILY UPDATE WORKFLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  GitHub      │───▶│  Validation  │───▶│   Auto       │      │
│  │  Actions     │    │  Script      │    │   Deploy     │      │
│  │  (6 AM)      │    │  (Node.js)   │    │   (cPanel)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                    │              │
│         │                   ▼                    │              │
│         │          ┌──────────────┐              │              │
│         │          │  Amazon API  │              │              │
│         │          │   (PA-API)   │              │              │
│         │          └──────────────┘              │              │
│         │                   │                    │              │
│         │                   ▼                    ▼              │
│         │          ┌──────────────────────────────┐            │
│         └─────────▶│      AUTOMATED UPDATES       │            │
│                    │  • Validate all ASINs        │            │
│                    │  • Update prices             │            │
│                    │  • Flag deals/discounts      │            │
│                    │  • Alert on broken links     │            │
│                    │  • Update "last modified"    │            │
│                    └──────────────────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### What's Already Built

| Component | Status | Location |
|-----------|--------|----------|
| Validation script | ✅ Ready | `scripts/validate-products.js` |
| GitHub Actions workflow | ✅ Ready | `.github/workflows/daily-validation.yml` |
| Auto-issue creation | ✅ Ready | Creates GitHub Issue when links break |

### What's Needed for Full Automation

#### Amazon Product Advertising API (PA-API 5.0)

**Required for:** Real-time prices, deal badges, high-quality images

**Requirements:**
- Amazon Associates account (you have: `memoofadomeen-20`)
- 3+ qualifying sales in past 30 days
- Apply at: https://affiliate-program.amazon.com/assoc_credentials/home

**Benefits with PA-API:**
| Feature | Current | With PA-API |
|---------|---------|-------------|
| Price accuracy | Static | Real-time |
| Deal badges | None | "20% OFF", "Lightning Deal" |
| Product images | Widget (low-res, shows gift box when broken) | Direct URLs (high-res) |
| Availability | Unknown | Live stock status |
| Broken link detection | Daily scan | Instant |

---

## Recommended Action Plan

### Phase 1: Deploy Current Fixes ⬅️ **DO THIS NOW**
- [x] Fix 7 broken ASINs ✅
- [x] Update dates to 2025 ✅
- [ ] **cPanel: Delete & re-clone repo**
- [ ] Verify site displays correctly

### Phase 2: API Integration
- [ ] Check Amazon Associates dashboard for PA-API eligibility
- [ ] Apply for API access if not already approved
- [ ] Set up API credentials as GitHub Secrets
- [ ] Enhance validation script to use PA-API

### Phase 3: Full Automation
- [ ] Enable GitHub Actions workflow (currently ready but inactive)
- [ ] Add price update script using PA-API
- [ ] Set up Slack/email notifications for broken links
- [ ] Add "% OFF" badges to ProductCard component

### Phase 4: Content Enhancement
- [ ] Create automated "Today's Deals" page
- [ ] Add price history tracking
- [ ] Implement dynamic "Last Updated" timestamps
- [ ] Add seasonal deal sections (Black Friday, Prime Day)

---

## Technical Details

### Running the Validation Script Manually

```bash
cd /Users/joeshipman/goodchristmasideas
node scripts/validate-products.js
```

### GitHub Actions Schedule

The workflow at `.github/workflows/daily-validation.yml` is configured to:
- Run daily at 6 AM UTC
- Check all Amazon ASINs
- Create a GitHub Issue if broken links are found
- Can be triggered manually from GitHub Actions tab

### Environment Variables for PA-API

When PA-API access is approved, add these as GitHub Secrets:
```
AMAZON_ACCESS_KEY=your-access-key
AMAZON_SECRET_KEY=your-secret-key
AMAZON_PARTNER_TAG=memoofadomeen-20
AMAZON_MARKETPLACE=www.amazon.com
```

---

## Cost Estimate

| Item | Monthly Cost |
|------|--------------|
| GitHub Actions | $0 (free tier covers this) |
| Amazon PA-API | $0 (free with Associates account) |
| Current hosting | No change |
| **Total Additional** | **$0** |

---

## Questions for Team Discussion

1. **PA-API Status:** Do we have Amazon PA-API access? (Check Associates dashboard)
2. **Notification Preference:** Slack, email, or GitHub Issues for broken link alerts?
3. **Update Frequency:** Daily at 6 AM okay, or different time?
4. **Content Review:** Who approves replacement products when items are discontinued?
5. **Deal Strategy:** Which product categories should highlight deals most prominently?

---

## Quick Reference

### Key Files
| File | Purpose |
|------|---------|
| `scripts/validate-products.js` | Checks all Amazon links |
| `.github/workflows/daily-validation.yml` | Automated daily checks |
| `TEAM_RECOMMENDATIONS.md` | This document |

### Key URLs
- **GitHub Repo:** https://github.com/jshipman78/goodchristmasideas
- **Live Site:** https://goodchristmasideas.com
- **Amazon Associates:** https://affiliate-program.amazon.com

---

*Document updated by Claude Code - December 15, 2025*
