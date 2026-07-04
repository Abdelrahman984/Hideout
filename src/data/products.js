const COLORS = {
  ar: ['أسود', 'أبيض', 'رمادي', 'كحلي'],
  en: ['Black', 'White', 'Gray', 'Navy'],
};

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const products = [
  {
    id: 1,
    name: { ar: 'تيشيرت Hideout Essential', en: 'Hideout Essential T-shirt' },
    category: 'tshirts',
    price: 350,
    image: '/images/tshirt-1.jpg',
    description: {
      ar: 'تيشيرت قطني 100% بقصة مريحة، مثالي للخروج اليومي.',
      en: '100% cotton t-shirt with a comfortable fit, perfect for daily wear.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 2,
    name: { ar: 'تيشيرت Hideout Minimal', en: 'Hideout Minimal T-shirt' },
    category: 'tshirts',
    price: 375,
    image: '/images/tshirt-2.jpg',
    description: {
      ar: 'تيشيرت بياقة دائرية وتصميم بسيط يناسب كل الأوقات.',
      en: 'Crew neck t-shirt with a simple design that suits every occasion.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 3,
    name: { ar: 'تيشيرت Hideout Signature', en: 'Hideout Signature T-shirt' },
    category: 'tshirts',
    price: 400,
    image: '/images/tshirt-3.jpg',
    description: {
      ar: 'تيشيرت بطبعة Hideout Signature، خامة ثقيلة ومريحة.',
      en: 'T-shirt with Hideout Signature print, heavy and comfortable fabric.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 4,
    name: { ar: 'هودي Hideout Classic', en: 'Hideout Classic Hoodie' },
    category: 'hoodies',
    price: 650,
    image: '/images/hoodie-1.jpg',
    description: {
      ar: 'هودي دافي مناسب للشتاء، بجيب أمامي وقبعة مزدوجة.',
      en: 'Warm hoodie perfect for winter, with a front pocket and double-layer hood.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 5,
    name: { ar: 'هودي Hideout Oversized', en: 'Hideout Oversized Hoodie' },
    category: 'hoodies',
    price: 700,
    image: '/images/hoodie-2.jpg',
    description: {
      ar: 'هودي بقصة واسعة وعصرية، مناسب للstreetwear.',
      en: 'Oversized trendy hoodie, perfect for streetwear looks.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 6,
    name: { ar: 'سويت شيرت Hideout', en: 'Hideout Sweatshirt' },
    category: 'hoodies',
    price: 600,
    image: '/images/hoodie-3.jpg',
    description: {
      ar: 'سويت شيرت بدون قبعة، خفيف ودافي في نفس الوقت.',
      en: 'Crew neck sweatshirt, lightweight yet warm.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 7,
    name: { ar: 'بنطلون Hideout Slim', en: 'Hideout Slim Pants' },
    category: 'pants',
    price: 550,
    image: '/images/pants-1.jpg',
    description: {
      ar: 'بنطلون قماش بقصة سليم، مناسب للخروج والعمل.',
      en: 'Slim-fit fabric pants, suitable for outings and work.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 8,
    name: { ar: 'جينز Hideout Dark', en: 'Hideout Dark Jeans' },
    category: 'pants',
    price: 600,
    image: '/images/pants-2.jpg',
    description: {
      ar: 'جينز غامق بقصة مستقيمة، كلاسيكي وعملي.',
      en: 'Dark straight-cut jeans, classic and practical.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
  {
    id: 9,
    name: { ar: 'بنطلون Hideout Cargo', en: 'Hideout Cargo Pants' },
    category: 'pants',
    price: 625,
    image: '/images/pants-3.jpg',
    description: {
      ar: 'بنطلون كارجو بجيوب عملية وتصميم شبابي.',
      en: 'Cargo pants with practical pockets and a youthful design.',
    },
    sizes: SIZES,
    colors: COLORS,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(productId, category, limit = 4) {
  return products
    .filter((p) => p.category === category && p.id !== Number(productId))
    .slice(0, limit);
}
