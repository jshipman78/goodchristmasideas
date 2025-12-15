# 🎄 Good Christmas Ideas

An automated affiliate gift guide site built with Astro, Tailwind CSS, and MDX.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
goodchristmasideas/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro      # Affiliate product display
│   │   └── GiftGuideCard.astro    # Homepage guide cards
│   ├── content/
│   │   ├── config.ts              # Content collection schema
│   │   └── guides/                # MDX gift guide articles
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Main site layout + SEO
│   │   └── ArticleLayout.astro    # Gift guide article layout
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   └── guides/[slug].astro    # Dynamic guide routes
│   └── styles/
│       └── global.css             # Tailwind + custom styles
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Adding New Gift Guides

1. Create a new `.mdx` file in `src/content/guides/`
2. Add frontmatter with required fields:

```mdx
---
layout: ../../layouts/ArticleLayout.astro
title: "Your Gift Guide Title"
description: "SEO description for the guide"
pubDate: "2024-11-01"
updatedDate: "2024-11-15"
category: "for-him"  # for-him, for-her, for-kids, for-teens, etc.
budget: "$25 - $100"
---

import ProductCard from '../../components/ProductCard.astro';

Your content here...

<ProductCard
  title="Product Name"
  description="Brief product description"
  image="https://image-url.com/product.jpg"
  price="$49"
  amazonUrl="https://www.amazon.com/dp/ASIN?tag=YOUR-TAG-20"
  rating={4.5}
  prime={true}
  badge="Best Seller"
/>
```

## Affiliate Configuration

### Amazon Associates

Replace `YOUR-TAG-20` in all ProductCard components with your Amazon Associates tracking ID.

Example: `https://www.amazon.com/dp/B000XFW6OU?tag=jshipman-20`

### Adding Other Affiliates

The ProductCard component accepts any URL, so you can use:
- Amazon Associates
- ShareASale
- CJ Affiliate
- Impact
- Direct brand affiliate programs

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Astro—just click "Deploy"

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Custom Domain Setup

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add `goodchristmasideas.com`
3. Update your domain DNS:
   - **Option A**: Change nameservers to Vercel
   - **Option B**: Add CNAME record pointing to `cname.vercel-dns.com`

## SEO Optimization

The site is pre-configured with:
- Automatic sitemap generation at `/sitemap.xml`
- Open Graph meta tags for social sharing
- Canonical URLs
- Semantic HTML structure
- Fast Core Web Vitals (static site)

## Content Automation Ideas

### AI-Generated Content Workflow

1. Use Claude to generate gift guide drafts
2. Review and edit for quality/accuracy
3. Research actual products on Amazon
4. Update ProductCard components with real ASINs
5. Commit and push—Vercel auto-deploys

### Batch Content Creation Prompt

```
Generate a gift guide article for [RECIPIENT TYPE] with:
- Catchy title with current year
- 150-word intro
- 5 category sections (e.g., Tech, Outdoors, Home, etc.)
- 2-3 product recommendations per category
- Brief conclusion

Format as MDX with ProductCard components.
```

## Maintenance Schedule

- **October**: Update all guides for the new year
- **November**: Check for broken links, update pricing
- **December**: Monitor traffic, add trending items
- **January-September**: Minimal maintenance needed

## License

MIT
