import { Product, Order } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "v-01",
    name: "Structured Wool Blazer",
    price: 189,
    category: "Women",
    primaryImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=700&auto=format&fit=crop",
    description: "An elegant, double-breasted blazer tailored from 100% merino wool. Designed with strong padded shoulders, structured lapels, and custom tortoiseshell button details, offering a modern oversized fit that transitions effortlessly from daytime tailoring to evening occasion wear.",
    status: "In Stock",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "Shell: 100% Merino Wool, Lining: 100% Recycled Viscose",
      "Double-breasted front button closure",
      "Padded shoulders and peak lapels",
      "Dry clean only",
      "Ethically tailored in Europe"
    ],
    featured: true
  },
  {
    id: "v-02",
    name: "Silk Slip Dress",
    price: 145,
    category: "Women",
    primaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=700&auto=format&fit=crop",
    description: "Cut from heavy, high-luster satin silk on the bias, this slip dress features a beautiful drape, adjustable cross-back fine straps, and a delicate cowl neckline. It hugs the form subtly, making it an essential luxury core staple.",
    status: "In Stock",
    sizes: ["XS", "S", "M", "L"],
    details: [
      "100% Mulberry Silk (22 Momme count)",
      "Bias-cut for a flattering body contour",
      "Adjustable crossover back shoulder straps",
      "Midi length with subtle side slit",
      "Hand wash cold or dry clean"
    ],
    featured: true
  },
  {
    id: "v-03",
    name: "Oversized Cashmere Knit",
    price: 220,
    category: "Women",
    primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=700&auto=format&fit=crop",
    description: "Spun from 100% premium Grade-A mongolian cashmere. This mock-neck sweater offers unmatched cozy lightweight warmth and features drop shoulders, relaxed wide sleeves, and chunky ribbed trims.",
    status: "Low Stock",
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Premium Mongolian Cashmere, 2-ply knit",
      "Relaxed mock-neck collar and drop shoulders",
      "Deep ribbed cuffs and asymmetrical split hem",
      "Ethically sourced and OEKO-TEX certified",
      "Dry clean or hand wash flat to dry"
    ],
    featured: true
  },
  {
    id: "v-04",
    name: "Tailored Linen Trousers",
    price: 125,
    category: "Women",
    primaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=700&auto=format&fit=crop",
    description: "Crafted from breathable, heavyweight Belgian linen. Features a flattering high-rise waistband, deep front pleats, and elegant wide-leg profiles that elongate the silhouette while staying relaxed and casual.",
    status: "In Stock",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Belgian flax linen",
      "High-rise with belt loops and clean zip-fly closure",
      "Deep front pleats and side slip pockets",
      "Pre-washed for extra softness",
      "Machine wash cool, hang dry"
    ],
    featured: false
  },
  {
    id: "v-05",
    name: "Minimal Trench Coat",
    price: 245,
    category: "Men",
    primaryImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700&auto=format&fit=crop",
    description: "A contemporary reinterpretation of the iconic trench. This single-breasted outerwear is cut from water-resistant cotton-gabardine, featuring a fluid drape, concealed button placket, and adjustable cuff tabs for a clean, sculptural aesthetic.",
    status: "In Stock",
    sizes: ["S", "M", "L", "XL"],
    details: [
      "Outer: 70% Organic Cotton, 30% Recycled Polyester",
      "Water-repellent technical gabardine weave",
      "Concealed front horn-button closure",
      "Back storm flap and central walk vent",
      "Made under fair trade certifications"
    ],
    featured: true
  },
  {
    id: "v-06",
    name: "Classic Organic Tee",
    price: 45,
    category: "Men",
    primaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=700&auto=format&fit=crop",
    description: "The ultimate heavyweight t-shirt. Cut from tight-knit 240gsm organic GOTS-certified cotton, it features a robust bound ribbed neckline, dropped shoulders, and a clean boxy vintage silhouette that keeps its shape wash after wash.",
    status: "In Stock",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "100% Organic GOTS-certified cotton",
      "Heavyweight 240gsm combed fibers",
      "Thick, non-stretch ribbed collar",
      "Slightly boxy cropped silhouette",
      "Made in Portugal"
    ],
    featured: false
  },
  {
    id: "v-07",
    name: "Heavyweight Cotton Hoodie",
    price: 110,
    category: "Men",
    primaryImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=700&auto=format&fit=crop",
    description: "An incredibly soft, heavy hoodie made from 450gsm french terry cotton. Styled with a double-layered structured hood, seamless kangaroo sleeve details, and premium flatlock stitch details.",
    status: "In Stock",
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Organic Cotton French Terry (450gsm)",
      "Double-lined hood without drawstrongs for an clean look",
      "Ribbed side panels for comfort stretch",
      "Preshrunk fabric",
      "Machine wash warm with like colors"
    ],
    featured: false
  },
  {
    id: "v-08",
    name: "Relaxed Cropped Chinos",
    price: 95,
    category: "Men",
    primaryImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=700&auto=format&fit=crop",
    description: "Expertly tailored trousers featuring a mid-rise waist, subtle front pleats, and a relaxed tapered leg that crops precisely at the ankle. Fabricated in premium heavy cotton twill with a touch of stretch for day-long comfort.",
    status: "In Stock",
    sizes: ["S", "M", "L", "XL"],
    details: [
      "98% Cotton Twill, 2% Elastane",
      "Mid-rise, relaxed tapered fit with slightly cropped cuffs",
      "YKK zip fly and hook-bar waist closure",
      "Rear button-through welt pockets",
      "Machine wash cool"
    ],
    featured: false
  },
  {
    id: "v-09",
    name: "Minimalist Leather Tote",
    price: 210,
    category: "Accessories",
    primaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=700&auto=format&fit=crop",
    description: "A gorgeous unisex tote crafted from thick, full-grain vegetable-tanned leather. Features unstructured raw edges, a deep internal zippered compartment, and double-stitched straps structured to fit comfortably over winter coats.",
    status: "Low Stock",
    sizes: ["One Size"],
    details: [
      "100% Full-grain vegetable tanned Italian leather",
      "Internal detached key holder and zipped pocket",
      "Debossed VOIRE typographic logo at base",
      "Strap drop length: 28cm",
      "Will develop a beautiful unique patina over time"
    ],
    featured: true
  },
  {
    id: "v-10",
    name: "Classic Metal Frame Sunglasses",
    price: 85,
    category: "Accessories",
    primaryImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=700&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=700&auto=format&fit=crop",
    description: "Slim, timeless sunglasses crafted in solid hypoallergenic metal alloy with dark UV400 protective lenses. Boasts lightweight acetate tips and comfortable adjustable silicone nose pads.",
    status: "In Stock",
    sizes: ["One Size"],
    details: [
      "Premium stainless-steel frame",
      "100% UVA/UVB protection (UV400) lenses",
      "Scratch-resistant CR-39 standard lenses",
      "Packaged in custom recycled leather sleeve and cleaning cloth",
      "Frame width: 142mm"
    ],
    featured: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "VOR-9481",
    date: "2026-06-10",
    total: 334,
    status: "Delivered",
    items: [
      {
        productName: "Structured Wool Blazer",
        size: "M",
        quantity: 1,
        price: 189,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700&auto=format&fit=crop"
      },
      {
        productName: "Silk Slip Dress",
        size: "S",
        quantity: 1,
        price: 145,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700&auto=format&fit=crop"
      }
    ],
    shippingAddress: {
      fullName: "Alexander Vance",
      email: "alexander.vance@lifestyle.com",
      address: "1042 Mercer St, Loft 4A",
      city: "Seattle",
      postalCode: "98109",
      country: "United States"
    }
  },
  {
    id: "VOR-8219",
    date: "2026-06-12",
    total: 245,
    status: "Shipped",
    items: [
      {
        productName: "Minimal Trench Coat",
        size: "L",
        quantity: 1,
        price: 245,
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=700&auto=format&fit=crop"
      }
    ],
    shippingAddress: {
      fullName: "Charlotte Dubois",
      email: "charlotte.d@creative.fr",
      address: "47 Rue de Bretagne",
      city: "Paris",
      postalCode: "75003",
      country: "France"
    }
  },
  {
    id: "VOR-5192",
    date: "2026-06-13",
    total: 130,
    status: "Processing",
    items: [
      {
        productName: "Classic Organic Tee",
        size: "M",
        quantity: 1,
        price: 45,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=700&auto=format&fit=crop"
      },
      {
        productName: "Classic Metal Frame Sunglasses",
        size: "One Size",
        quantity: 1,
        price: 85,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=700&auto=format&fit=crop"
      }
    ],
    shippingAddress: {
      fullName: "Takahiro Sato",
      email: "takahiro.sato@design.co.jp",
      address: "3-18-2 Minami-Aoyama",
      city: "Minato-ku, Tokyo",
      postalCode: "107-0062",
      country: "Japan"
    }
  }
];
