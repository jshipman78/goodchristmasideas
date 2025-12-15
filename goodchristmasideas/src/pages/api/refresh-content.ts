import type { APIRoute } from 'astro';
import { products as techProducts } from '../../data/products/tech-gifts';
import { products as dadProducts } from '../../data/products/gifts-for-dad';
import { products as momProducts } from '../../data/products/gifts-for-mom';
import { products as budgetProducts } from '../../data/products/gifts-under-25';

export const prerender = false;

interface DailyContent {
  generatedAt: string;
  featuredProducts: string[];
  trendingBadges: Record<string, string>;
  seasonalMessage: string;
  heroProduct: {
    title: string;
    tagline: string;
  };
  refreshedDescriptions: Record<string, string>;
}

export const GET: APIRoute = async ({ request }) => {
  // Verify cron secret in production
  const authHeader = request.headers.get('authorization');
  const cronSecret = import.meta.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const anthropicKey = import.meta.env.ANTHROPIC_API_KEY;

    if (!anthropicKey) {
      return new Response(JSON.stringify({
        error: 'ANTHROPIC_API_KEY not configured',
        fallback: true
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Gather all products for context
    const allProducts = [
      ...techProducts,
      ...dadProducts,
      ...momProducts,
      ...budgetProducts
    ];

    const productTitles = allProducts.map(p => p.title);

    // Call Claude API to generate fresh content
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `You are a gift guide content curator. Generate fresh daily content for a Christmas gift website.

Current date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

Available products: ${productTitles.join(', ')}

Generate a JSON response with:
1. "featuredProducts": Array of 4 product titles to feature today (rotate different ones)
2. "trendingBadges": Object mapping product titles to trending badge text (e.g., "Hot Today", "Trending", "Popular Pick", "Editor's Choice") - only for 3-4 products
3. "seasonalMessage": A short festive message for the homepage (1 sentence, mention how many days until Christmas if applicable)
4. "heroProduct": Object with "title" (one featured product) and "tagline" (catchy 5-7 word tagline)
5. "refreshedDescriptions": Object mapping 3-4 product titles to fresh, engaging descriptions (2-3 sentences each)

Make the content feel timely and seasonal. If it's close to Christmas, create urgency. Rotate featured items to keep the site fresh.

Respond ONLY with valid JSON, no markdown or explanation.`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const contentText = data.content[0].text;

    // Parse the generated content
    let generatedContent: Omit<DailyContent, 'generatedAt'>;
    try {
      generatedContent = JSON.parse(contentText);
    } catch {
      throw new Error('Failed to parse Claude response as JSON');
    }

    const dailyContent: DailyContent = {
      generatedAt: new Date().toISOString(),
      ...generatedContent
    };

    // Trigger Vercel deploy hook to rebuild with new content
    const deployHook = import.meta.env.VERCEL_DEPLOY_HOOK;
    if (deployHook) {
      await fetch(deployHook, { method: 'POST' });
    }

    return new Response(JSON.stringify({
      success: true,
      content: dailyContent
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Content refresh error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
