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
    title: "Barefoot Dreams CozyChic Throw Blanket",
    description: "The softest blanket she'll ever own. Celebrity favorite that lives up to the hype.",
    price: "$147",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B00KRPLPUW?tag=memoofadomeen-20",
    category: "top-picks",
    badge: "Best Seller",
    prime: true,
  },
  {
    title: "Le Creuset Stoneware Mug",
    description: "Elegant, chip-resistant, and keeps coffee warm longer. A small luxury for her morning routine.",
    price: "$25",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B079Z2B7LT?tag=memoofadomeen-20",
    category: "kitchen",
    prime: true,
  },
  {
    title: "Kindle Paperwhite",
    description: "For the mom who loves to read. Waterproof, glare-free, perfect for bath time reading.",
    price: "$140",
    originalPrice: "$160",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B09TMN58KL?tag=memoofadomeen-20",
    category: "tech",
    badge: "Top Rated",
    prime: true,
  },
  {
    title: "Laneige Lip Sleeping Mask",
    description: "Cult favorite overnight lip treatment. Wake up with soft, hydrated lips.",
    price: "$24",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B07GBLXWBY?tag=memoofadomeen-20",
    category: "beauty",
    prime: true,
  },
  {
    title: "Vitruvi Stone Diffuser",
    description: "Beautiful ceramic diffuser that elevates any room. Pairs perfectly with essential oils.",
    price: "$119",
    rating: 4.6,
    amazonUrl: "https://www.amazon.com/dp/B01MFBWT8O?tag=memoofadomeen-20",
    category: "home",
    prime: true,
  },
  {
    title: "Slip Silk Pillowcase",
    description: "Prevents hair breakage and sleep creases. Once she tries silk, there's no going back.",
    price: "$89",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B06XS4J8VZ?tag=memoofadomeen-20",
    category: "beauty",
    badge: "Editor's Pick",
    prime: true,
  },
  {
    title: "Nespresso Vertuo Next",
    description: "Barista-quality coffee at home. If she hasn't made the switch to pod coffee yet, this will convert her.",
    price: "$159",
    originalPrice: "$209",
    rating: 4.5,
    amazonUrl: "https://www.amazon.com/dp/B084GY58FB?tag=memoofadomeen-20",
    category: "kitchen",
    badge: "24% Off",
    prime: true,
  },
  {
    title: "L'Occitane Hand Cream Trio",
    description: "Three beloved scents in the perfect purse size. Her hands will thank you all winter.",
    price: "$29",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B08JHSLY4D?tag=memoofadomeen-20",
    category: "beauty",
    prime: true,
  },
  {
    title: "UGG Scuffette Slippers",
    description: "Genuine sheepskin slippers that mold to her feet. Year-round cozy comfort.",
    price: "$95",
    rating: 4.7,
    amazonUrl: "https://www.amazon.com/dp/B01AIJ4QGM?tag=memoofadomeen-20",
    category: "top-picks",
    prime: true,
  },
  {
    title: "Felco F-2 Pruning Shears",
    description: "Swiss-made, incredibly sharp, lasts decades. The gold standard for gardeners.",
    price: "$65",
    rating: 4.8,
    amazonUrl: "https://www.amazon.com/dp/B00004SD74?tag=memoofadomeen-20",
    category: "garden",
    prime: true,
  },
];

export const categories = [
  { id: "all", label: "All Gifts" },
  { id: "top-picks", label: "Top Picks" },
  { id: "beauty", label: "Beauty" },
  { id: "kitchen", label: "Kitchen" },
  { id: "home", label: "Home" },
  { id: "tech", label: "Tech" },
];

export const guideInfo = {
  title: "30 Thoughtful Gifts for Mom (2025)",
  description: "Skip the generic gifts. These carefully chosen presents show mom how much you care, from pampering luxuries to practical items she'd never buy herself.",
  category: "for-her",
  budget: "$15 - $150",
};
