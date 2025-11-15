import { renderHook, act } from '@testing-library/react';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = { productId: number; name: string; price: number; quantity: number; };

type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {
      // ignore storage errors in tests
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i));
  };

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

function setup() {
  const wrapper = ({ children }: { children?: ReactNode }) => <CartProvider>{children}</CartProvider>;
  const { result } = renderHook(() => useCart(), { wrapper });
  return result;
}

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');
});

test('addItem guarda en localStorage y calcula total', () => {
  const cart = setup();

  act(() => {
    cart.current.addItem({ productId: 5, name: 'Taladro', price: 100, quantity: 2 });
  });

  expect(localStorage.setItem).toHaveBeenCalled();
  expect(cart.current.items).toHaveLength(1);
  expect(cart.current.total).toBe(200);
});

test('updateQuantity y removeItem actualizan el estado y storage', () => {
  const cart = setup();

  act(() => {
    cart.current.addItem({ productId: 5, name: 'Taladro', price: 100, quantity: 2 });
    cart.current.updateQuantity(5, 3);
  });
  expect(cart.current.items[0].quantity).toBe(3);
  expect(cart.current.total).toBe(300);

  act(() => {
    cart.current.removeItem(5);
  });
  expect(cart.current.items).toHaveLength(0);
});