export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: number[];
  colors: string[];
  rating: number;
  reviews: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Bakya Classica",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1654401574155-03442ee73114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMEZpbGlwaW5vJTIwc2xpcHBlcnN8ZW58MXx8fHwxNzczOTI4MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Traditional",
    description: "Authentic wooden Bakya handcrafted by Bicol artisans. A timeless piece of Filipino heritage combining traditional craftsmanship with modern comfort.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Natural Wood", "Dark Brown", "Polished"],
    rating: 4.9,
    reviews: 287,
    stock: 45
  },
  {
    id: "2",
    name: "Abaca Woven Sandals",
    price: 38.99,
    image: "https://images.unsplash.com/photo-1769478973319-1b6eebd70151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMHNhbmRhbHMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NzM5MjgyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Woven",
    description: "Handwoven from sustainable abaca fiber sourced from Bicol farms. Eco-friendly, breathable, and perfect for tropical weather.",
    sizes: [6, 7, 8, 9, 10],
    colors: ["Natural", "Brown", "Tan"],
    rating: 4.7,
    reviews: 156,
    stock: 32
  },
  {
    id: "3",
    name: "Tsinelas Deluxe",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1600109978256-6f387208a070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwbGVhdGhlciUyMHNhbmRhbHN8ZW58MXx8fHwxNzczOTI4MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Casual",
    description: "Premium Filipino flip-flops (tsinelas) made with durable rubber and comfortable straps. A staple in every Filipino household, elevated.",
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    colors: ["Black", "Navy", "Brown"],
    rating: 4.8,
    reviews: 412,
    stock: 68
  },
  {
    id: "4",
    name: "Bicolano Leather Slip-Ons",
    price: 65.99,
    image: "https://images.unsplash.com/photo-1564484539125-88cbf21cbb25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHNsaXAlMjBvbiUyMHNob2VzfGVufDF8fHx8MTc3MzkyODIyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Casual",
    description: "Handcrafted leather slip-ons by skilled Bicol shoemakers. Combines traditional leatherworking techniques with contemporary design.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Tan", "Dark Brown", "Black"],
    rating: 4.9,
    reviews: 298,
    stock: 28
  },
  {
    id: "5",
    name: "Rattan Weave Espadrilles",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1769478973319-1b6eebd70151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHdvdmVuJTIwZm9vdHdlYXJ8ZW58MXx8fHwxNzczOTI4MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Woven",
    description: "Lightweight espadrilles featuring intricate rattan weaving from Bicol artisans. Stylish and sustainable footwear for everyday wear.",
    sizes: [6, 7, 8, 9, 10],
    colors: ["Natural Rattan", "Dyed Blue", "Dyed Red"],
    rating: 4.6,
    reviews: 189,
    stock: 41
  },
  {
    id: "6",
    name: "Pandan Fiber Sandals",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1752608471132-643878f4478f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGZsaXAlMjBmbG9wcyUyMG5hdHVyYWx8ZW58MXx8fHwxNzczOTI4MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Eco-Friendly",
    description: "Eco-friendly sandals woven from pandan leaves. Biodegradable, comfortable, and showcasing traditional Filipino weaving methods.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Natural Green", "Bleached", "Brown"],
    rating: 4.7,
    reviews: 234,
    stock: 52
  },
  {
    id: "7",
    name: "Bamboo Sole Slides",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1641754644192-24e09c2b444b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBzYW5kYWxzJTIwZWNvfGVufDF8fHx8MTc3MzkyODIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Eco-Friendly",
    description: "Modern slides with bamboo soles sourced from Bicol's abundant bamboo forests. Sustainable, durable, and naturally antimicrobial.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["Natural Bamboo", "Stained Dark", "Black Strap"],
    rating: 4.8,
    reviews: 321,
    stock: 35
  },
  {
    id: "8",
    name: "Malong Pattern Sneakers",
    price: 78.99,
    image: "https://images.unsplash.com/photo-1770049770706-6fc82ab583d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGV0aG5pYyUyMGZvb3R3ZWFyfGVufDF8fHx8MTc3MzkyODIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Modern Filipino",
    description: "Contemporary sneakers featuring traditional Filipino malong textile patterns. A fusion of heritage and modern street style.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["Multi-Color", "Blue Pattern", "Red Pattern"],
    rating: 4.9,
    reviews: 445,
    stock: 23
  }
];

export const categories = ["All", "Traditional", "Woven", "Casual", "Eco-Friendly", "Modern Filipino"];