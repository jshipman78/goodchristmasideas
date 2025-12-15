import type { Product } from '../data/products/tech-gifts';

export interface DailyContent {
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

// Default content when no AI-generated content is available
export const defaultDailyContent: DailyContent = {
  generatedAt: new Date().toISOString(),
  featuredProducts: [
    "Apple AirPods Pro (2nd Gen)",
    "Nintendo Switch OLED",
    "Kindle Paperwhite",
    "Echo Dot (5th Gen)"
  ],
  trendingBadges: {
    "Apple AirPods Pro (2nd Gen)": "Best Seller",
    "Nintendo Switch OLED": "Hot Item"
  },
  seasonalMessage: "Find the perfect gift for everyone on your list this holiday season!",
  heroProduct: {
    title: "Apple AirPods Pro (2nd Gen)",
    tagline: "The gift they'll use every day"
  },
  refreshedDescriptions: {}
};

let cachedContent: DailyContent | null = null;

/**
 * Load daily content from the generated JSON file or use defaults
 */
export async function getDailyContent(): Promise<DailyContent> {
  if (cachedContent) {
    return cachedContent;
  }

  try {
    // In production, this would be fetched from a KV store or API
    // For now, we use the default content
    cachedContent = defaultDailyContent;
    return cachedContent;
  } catch {
    return defaultDailyContent;
  }
}

/**
 * Merge static product data with daily AI-generated enhancements
 */
export function mergeProductWithDailyContent(
  product: Product,
  dailyContent: DailyContent
): Product & { dynamicBadge?: string; isFeatured: boolean; dynamicDescription?: string } {
  const isFeatured = dailyContent.featuredProducts.includes(product.title);
  const dynamicBadge = dailyContent.trendingBadges[product.title];
  const dynamicDescription = dailyContent.refreshedDescriptions[product.title];

  return {
    ...product,
    isFeatured,
    dynamicBadge,
    dynamicDescription: dynamicDescription || product.description,
    badge: dynamicBadge || product.badge
  };
}

/**
 * Get featured products from the daily content
 */
export function getFeaturedProductTitles(dailyContent: DailyContent): string[] {
  return dailyContent.featuredProducts;
}

/**
 * Calculate days until Christmas
 */
export function getDaysUntilChristmas(): number {
  const now = new Date();
  const christmas = new Date(now.getFullYear(), 11, 25); // December 25

  // If Christmas has passed this year, calculate for next year
  if (now > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }

  const diffTime = christmas.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Get a formatted "last updated" string
 */
export function getLastUpdatedString(dailyContent: DailyContent): string {
  const generatedDate = new Date(dailyContent.generatedAt);
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - generatedDate.getTime()) / (1000 * 60 * 60));

  if (diffHours < 1) {
    return 'Updated just now';
  } else if (diffHours < 24) {
    return `Updated ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else {
    return `Updated ${generatedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }
}
