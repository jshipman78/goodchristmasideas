export interface Product {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  amazonUrl: string;
  category: string;
  badge?: string;
  prime?: boolean;
}

export const products: Product[] = [
  {
    title: "YETI Rambler 14 oz Mug",
    description: "Camp-style handle, keeps coffee hot for hours. The smaller sibling of our favorite tumbler.",
    price: "$25",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B08D9C7WK2?tag=memoofadomeen-20",
    category: "home",
    badge: "Best Seller",
    prime: true,
  },
  {
    title: "Anker PowerCore 10000",
    description: "Credit card-sized power bank that charges a phone twice. Essential for travel.",
    price: "$22",
    rating: 4.6,
    amazonUrl: "https://www.amazon.com/dp/B0B5HM5VY5?tag=memoofadomeen-20",
    category: "tech",
    prime: true,
  },
  {
    title: "Darn Tough Hiker Socks",
    description: "Lifetime warranty. Seriously. These are the last socks you'll ever need to buy.",
    price: "$25",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B000XIEAH8?tag=memoofadomeen-20",
    category: "apparel",
    badge: "Top Rated",
    prime: true,
  },
  {
    title: "Laneige Lip Sleeping Mask",
    description: "Cult-favorite overnight lip treatment. Wake up with soft, hydrated lips.",
    price: "$24",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B07P8Z5B8F?tag=memoofadomeen-20",
    category: "beauty",
    prime: true,
  },
  {
    title: "OXO Good Grips Garlic Press",
    description: "The garlic press that actually works and cleans up easily. Kitchen essential.",
    price: "$18",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B00HEZ888K?tag=memoofadomeen-20",
    category: "home",
    prime: true,
  },
  {
    title: "Milwaukee Fastback Utility Knife",
    description: "Satisfying flip-open action. Every dad's favorite tool. Built to last.",
    price: "$20",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B01N0PEKYS?tag=memoofadomeen-20",
    category: "tools",
    prime: true,
  },
  {
    title: "Magnetic Wristband for Tools",
    description: "Holds screws, nails, and bits while working. Simple genius for any DIYer.",
    price: "$15",
    rating: 4.4,
    amazonUrl: "https://www.amazon.com/dp/B01HRCU3SW?tag=memoofadomeen-20",
    category: "tools",
    badge: "Under $20",
    prime: true,
  },
  {
    title: "Exploding Kittens Card Game",
    description: "Fast-paced, hilarious card game. Easy to learn, impossible to put down.",
    price: "$20",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B010TQY7A8?tag=memoofadomeen-20",
    category: "games",
    prime: true,
  },
  {
    title: "Burt's Bees Lip Balm 4-Pack",
    description: "The classic that everyone needs. Multiple flavors to share or hoard.",
    price: "$10",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B00076TORC?tag=memoofadomeen-20",
    category: "beauty",
    badge: "Best Value",
    prime: true,
  },
  {
    title: "Anker USB-C Charging Cable 3-Pack",
    description: "Nylon-braided, tangle-free, nearly indestructible. Everyone needs spare cables.",
    price: "$15",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B09LC2XXK2?tag=memoofadomeen-20",
    category: "tech",
    prime: true,
  },
  {
    title: "Maldon Sea Salt Flakes",
    description: "The finishing salt chefs swear by. Elevates any dish instantly.",
    price: "$10",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B00017028M?tag=memoofadomeen-20",
    category: "food",
    prime: true,
  },
  {
    title: "Wet Brush Original Detangler",
    description: "The brush that glides through tangles without pulling. Game-changer for thick hair.",
    price: "$12",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B005LPN9B6?tag=memoofadomeen-20",
    category: "beauty",
    prime: true,
  },
];

export const categories = [
  { id: "all", label: "All Gifts" },
  { id: "tech", label: "Tech" },
  { id: "beauty", label: "Beauty" },
  { id: "home", label: "Home" },
  { id: "tools", label: "Tools" },
  { id: "games", label: "Games" },
];

export const guideInfo = {
  title: "40 Best Gifts Under $25 (2025)",
  description: "Budget-friendly doesn't mean boring. These affordable gifts punch above their price point.",
  category: "budget",
  budget: "Under $25",
};
