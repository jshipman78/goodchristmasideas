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
    title: "Apple AirPods Pro (2nd Gen)",
    description: "Best-in-class noise cancellation, transparency mode, and seamless Apple integration.",
    price: "$189",
    originalPrice: "$249",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B0CHWRXH8B?tag=memoofadomeen-20",
    category: "audio",
    badge: "24% Off",
    prime: true,
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    description: "The best over-ear noise-canceling headphones. 30-hour battery, incredible sound.",
    price: "$348",
    originalPrice: "$400",
    rating: 4.6,
    amazonUrl: "https://www.amazon.com/dp/B09XS7JWHH?tag=memoofadomeen-20",
    category: "audio",
    badge: "Top Rated",
    prime: true,
  },
  {
    title: "Apple Watch SE (2nd Gen)",
    description: "Smart watch that does it all. Fitness tracking, notifications, health features.",
    price: "$249",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B0CHX9CY7W?tag=memoofadomeen-20",
    category: "wearables",
    prime: true,
  },
  {
    title: "Echo Dot (5th Gen)",
    description: "The entry point to smart home. Music, timers, smart device control.",
    price: "$50",
    originalPrice: "$55",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B09B8V1LZ3?tag=memoofadomeen-20",
    category: "smart-home",
    badge: "Best Value",
    prime: true,
  },
  {
    title: "Ring Battery Video Doorbell",
    description: "See who's at the door from anywhere. Essential home security with Head-to-Toe video.",
    price: "$100",
    rating: 4.5,
    amazonUrl: "https://www.amazon.com/dp/B0BZWRSRWV?tag=memoofadomeen-20",
    category: "smart-home",
    prime: true,
  },
  {
    title: "Nintendo Switch OLED",
    description: "The versatile gaming console. Play on TV or take it anywhere. OLED screen is gorgeous.",
    price: "$349",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B098RKWHHZ?tag=memoofadomeen-20",
    category: "gaming",
    badge: "Hot",
    prime: true,
  },
  {
    title: "Kindle Paperwhite (2024)",
    description: "E-reader with glare-free 7\" display. Waterproof for beach or bath reading.",
    price: "$150",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B0CFPJYX7P?tag=memoofadomeen-20",
    category: "productivity",
    prime: true,
  },
  {
    title: "Anker 3-in-1 MagSafe Charger",
    description: "Phone, watch, earbuds—all on one stand. Clean nightstand solution.",
    price: "$90",
    originalPrice: "$110",
    rating: 4.5,
    amazonUrl: "https://www.amazon.com/dp/B0C9DNYKMJ?tag=memoofadomeen-20",
    category: "accessories",
    prime: true,
  },
  {
    title: "Anker 737 Power Bank",
    description: "140W power bank that charges laptops. Never run out of power again.",
    price: "$110",
    originalPrice: "$150",
    rating: 4.6,
    amazonUrl: "https://www.amazon.com/dp/B09VPHVT2Z?tag=memoofadomeen-20",
    category: "accessories",
    badge: "27% Off",
    prime: true,
  },
  {
    title: "Fire TV Stick 4K Max",
    description: "Streaming on any TV. All the apps, voice control, and 4K quality.",
    price: "$60",
    rating: 4.6,
    amazonUrl: "https://www.amazon.com/dp/B0BP9SNVH9?tag=memoofadomeen-20",
    category: "smart-home",
    prime: true,
  },
  {
    title: "Logitech MX Master 3S Mouse",
    description: "The mouse for serious work. Ergonomic, precise, works on any surface.",
    price: "$100",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B09HM94VDS?tag=memoofadomeen-20",
    category: "productivity",
    prime: true,
  },
  {
    title: "PlayStation 5 DualSense Controller",
    description: "Next-gen controller with haptic feedback. Feel every impact.",
    price: "$70",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B0CQXVM3BP?tag=memoofadomeen-20",
    category: "gaming",
    prime: true,
  },
];

export const categories = [
  { id: "all", label: "All Tech" },
  { id: "audio", label: "Audio" },
  { id: "smart-home", label: "Smart Home" },
  { id: "gaming", label: "Gaming" },
  { id: "wearables", label: "Wearables" },
  { id: "accessories", label: "Accessories" },
];

export const guideInfo = {
  title: "30 Best Tech Gifts (2025)",
  description: "From essential accessories to cutting-edge gadgets, find the perfect tech gift for any budget.",
  category: "tech",
  budget: "$50 - $400",
};
