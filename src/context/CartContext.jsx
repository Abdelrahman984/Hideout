import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const CART_KEY = 'hideout-cart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, size, color, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity,
          image: product.image,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, size, color, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter(
          (i) => !(i.productId === productId && i.size === size && i.color === color)
        );
      }
      return prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      );
    });
  }, []);

  const removeItem = useCallback((productId, size, color) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.size === size && i.color === color)
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
