import products from './products.json';

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

export function getProductImage(product, color, lang = 'en') {
  if (!product || !color) return product?.defaultImage;
  const colorEn = lang === 'ar'
    ? product.colors.en[product.colors.ar.indexOf(color)]
    : color;
  return product.imagesByColor?.[colorEn] || product.defaultImage;
}
