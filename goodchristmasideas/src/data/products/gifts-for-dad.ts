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
  // Top Picks
  {
    title: "YETI Rambler 20 oz Tumbler",
    description: "Keeps coffee hot for hours. Virtually indestructible. The tumbler he'll use every single day.",
    price: "$35",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B073WJMKHN?tag=memoofadomeen-20",
    category: "top-picks",
    badge: "Best Seller",
    prime: true,
  },
  {
    title: "Milwaukee Fastback Utility Knife",
    description: "The satisfying flip-open action makes this every dad's favorite tool. Built to last.",
    price: "$20",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B01N0PEKYS?tag=memoofadomeen-20",
    category: "top-picks",
    prime: true,
  },
  {
    title: "Apple AirTag 4-Pack",
    description: "For the dad who's always losing his keys, wallet, or remote. Peace of mind in a tiny package.",
    price: "$79",
    originalPrice: "$99",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B0D54JZTHY?tag=memoofadomeen-20",
    category: "tech",
    badge: "20% Off",
    prime: true,
  },
  {
    title: "Anker 737 Power Bank",
    description: "140W beast that can charge a laptop. Perfect for road trips, camping, or power outages.",
    price: "$110",
    originalPrice: "$150",
    rating: 4.6,
    amazonUrl: "https://www.amazon.com/dp/B09VPHVT2Z?tag=memoofadomeen-20",
    category: "tech",
    prime: true,
  },
  {
    title: "Stanley Classic Legendary Bottle",
    description: "The same thermos your grandpa swore by, still made the same way. 40-hour heat retention.",
    price: "$45",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B09GFNTNZ1?tag=memoofadomeen-20",
    category: "outdoors",
    prime: true,
  },
  {
    title: "Leatherman Wave+",
    description: "18 tools in one. The multitool that'll make him feel prepared for anything.",
    price: "$100",
    originalPrice: "$120",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B07BK58NX2?tag=memoofadomeen-20",
    category: "outdoors",
    badge: "Editor's Choice",
    prime: true,
  },
  {
    title: "Darn Tough Hiker Socks",
    description: "Lifetime warranty. Once he tries these, he'll never go back to regular socks.",
    price: "$25",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B000XIEAH8?tag=memoofadomeen-20",
    category: "budget",
    prime: true,
  },
  {
    title: "Magnetic Wristband for Tools",
    description: "Holds screws, nails, and bits while he works. Simple but genius.",
    price: "$15",
    rating: 4.4,
    amazonUrl: "https://www.amazon.com/dp/B01HRCU3SW?tag=memoofadomeen-20",
    category: "budget",
    badge: "Under $20",
    prime: true,
  },
];

export const categories = [
  { id: "all", label: "All Gifts" },
  { id: "top-picks", label: "Top Picks" },
  { id: "tech", label: "Tech" },
  { id: "outdoors", label: "Outdoors" },
  { id: "budget", label: "Under $30" },
];

export const guideInfo = {
  title: "25 Best Gifts for Dad Who Has Everything (2025)",
  description: "Struggling to find a gift for the dad who claims he doesn't need anything? These unique, practical presents will surprise even the hardest-to-shop-for father.",
  category: "for-him",
  budget: "$15 - $200",
};
