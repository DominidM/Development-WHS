import React, { createContext, useState, useContext, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; 
  quantity: number;
  image?: string;
  stock?: number;
  brand?: string;
  description?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

const CART_KEY = "shopping_cart_data";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      let updatedItems = [...prevItems];
      if (existingItemIndex > -1) {
        const item = updatedItems[existingItemIndex];
        // Actualiza el stock si viene en newItem (por si cambió en el backend)
        if (newItem.stock !== undefined) {
          item.stock = newItem.stock;
        }
        const maxQuantity = item.stock ?? newItem.stock ?? 99;
        const newQuantity = item.quantity + newItem.quantity;
        item.quantity = Math.min(newQuantity, maxQuantity);
      } else {
        const maxQuantity = newItem.stock ?? 99;
        updatedItems = [...updatedItems, { ...newItem, quantity: Math.min(newItem.quantity, maxQuantity) }];
      }
      return updatedItems;
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(quantity, item.stock ?? 99)
              ),
            }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};