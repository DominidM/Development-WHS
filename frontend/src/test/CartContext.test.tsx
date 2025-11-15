import React from 'react';
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart, CartItem } from '../components/ui/CartContext';

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Inicialización', () => {
    test('inicia con carrito vacío', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual([]);
    });

    test('carga items desde localStorage al iniciar', () => {
      const savedItems: CartItem[] = [
        {
          id: '1',
          productId: 1,
          name: 'Taladro',
          price: 100,
          quantity: 2,
        },
      ];

      localStorage.setItem('shopping_cart_data', JSON.stringify(savedItems));

      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual(savedItems);
    });

    test('maneja localStorage vacío correctamente', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual([]);
    });
  });

  describe('addItem', () => {
    test('agrega un nuevo item al carrito', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const newItem: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
        stock: 10,
      };

      act(() => {
        result.current.addItem(newItem);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual(newItem);
    });

    test('incrementa cantidad si el item ya existe', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 2,
        stock: 10,
      };

      act(() => {
        result.current.addItem(item);
        result.current.addItem({ ...item, quantity: 3 });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(5);
    });

    test('respeta el límite de stock al agregar', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 8,
        stock: 10,
      };

      act(() => {
        result.current.addItem(item);
        result.current.addItem({ ...item, quantity: 5 });
      });

      expect(result.current.items[0].quantity).toBe(10);
    });

    test('usa stock de 99 por defecto si no se especifica', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 50,
      };

      act(() => {
        result.current.addItem(item);
        result.current.addItem({ ...item, quantity: 60 });
      });

      expect(result.current.items[0].quantity).toBe(99);
    });

    test('actualiza stock del item existente', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 2,
        stock: 10,
      };

      act(() => {
        result.current.addItem(item);
        result.current.addItem({ ...item, quantity: 1, stock: 5 });
      });

      expect(result.current.items[0].stock).toBe(5);
      expect(result.current.items[0].quantity).toBe(3);
    });

    test('agrega múltiples items diferentes', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      const item2: CartItem = {
        id: '2',
        productId: 2,
        name: 'Sierra',
        price: 50,
        quantity: 2,
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].name).toBe('Taladro');
      expect(result.current.items[1].name).toBe('Sierra');
    });

    test('agrega item con todos los campos opcionales', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro Profesional',
        price: 349.99,
        originalPrice: 399.99,
        quantity: 1,
        image: 'https://example.com/taladro.jpg',
        stock: 15,
        brand: 'DeWalt',
        description: 'Taladro de alta potencia',
      };

      act(() => {
        result.current.addItem(item);
      });

      expect(result.current.items[0]).toEqual(item);
    });
  });

  describe('removeItem', () => {
    test('elimina un item del carrito', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeItem('1');
      });

      expect(result.current.items).toHaveLength(0);
    });

    test('elimina el item correcto cuando hay múltiples', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      const item2: CartItem = {
        id: '2',
        productId: 2,
        name: 'Sierra',
        price: 50,
        quantity: 2,
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      act(() => {
        result.current.removeItem('1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('2');
      expect(result.current.items[0].name).toBe('Sierra');
    });

    test('no hace nada si el item no existe', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
      });

      act(() => {
        result.current.removeItem('999');
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    test('actualiza la cantidad de un item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
        stock: 10,
      };

      act(() => {
        result.current.addItem(item);
      });

      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    test('no permite cantidad menor a 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 5,
      };

      act(() => {
        result.current.addItem(item);
      });

      act(() => {
        result.current.updateQuantity('1', 0);
      });

      expect(result.current.items[0].quantity).toBe(1);

      act(() => {
        result.current.updateQuantity('1', -5);
      });

      expect(result.current.items[0].quantity).toBe(1);
    });

    test('respeta el límite de stock', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
        stock: 10,
      };

      act(() => {
        result.current.addItem(item);
      });

      act(() => {
        result.current.updateQuantity('1', 15);
      });

      expect(result.current.items[0].quantity).toBe(10);
    });

    test('usa límite de 99 si no hay stock definido', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
      });

      act(() => {
        result.current.updateQuantity('1', 150);
      });

      expect(result.current.items[0].quantity).toBe(99);
    });

    test('no afecta otros items al actualizar cantidad', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      const item2: CartItem = {
        id: '2',
        productId: 2,
        name: 'Sierra',
        price: 50,
        quantity: 2,
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
      expect(result.current.items[1].quantity).toBe(2);
    });
  });

  describe('clearCart', () => {
    test('elimina todos los items del carrito', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      const item2: CartItem = {
        id: '2',
        productId: 2,
        name: 'Sierra',
        price: 50,
        quantity: 2,
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });

    test('funciona correctamente con carrito vacío', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('Persistencia en localStorage', () => {
    test('guarda items en localStorage al agregar', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
      });

      const saved = localStorage.getItem('shopping_cart_data');
      expect(saved).toBeTruthy();
      
      const parsed = JSON.parse(saved!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe('Taladro');
    });

    test('actualiza localStorage al eliminar item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
        result.current.removeItem('1');
      });

      const saved = localStorage.getItem('shopping_cart_data');
      const parsed = JSON.parse(saved!);
      expect(parsed).toHaveLength(0);
    });

    test('actualiza localStorage al cambiar cantidad', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
        result.current.updateQuantity('1', 5);
      });

      const saved = localStorage.getItem('shopping_cart_data');
      const parsed = JSON.parse(saved!);
      expect(parsed[0].quantity).toBe(5);
    });

    test('actualiza localStorage al limpiar carrito', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
        result.current.clearCart();
      });

      const saved = localStorage.getItem('shopping_cart_data');
      const parsed = JSON.parse(saved!);
      expect(parsed).toHaveLength(0);
    });

    test('mantiene persistencia entre re-renders', () => {
      const { result, unmount } = renderHook(() => useCart(), { wrapper });

      const item: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item);
      });

      unmount();

      // Crear nuevo hook
      const { result: result2 } = renderHook(() => useCart(), { wrapper });

      expect(result2.current.items).toHaveLength(1);
      expect(result2.current.items[0].name).toBe('Taladro');
    });
  });

  describe('Casos de uso complejos', () => {
    test('agregar, actualizar y eliminar múltiples items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 1,
        stock: 10,
      };

      const item2: CartItem = {
        id: '2',
        productId: 2,
        name: 'Sierra',
        price: 50,
        quantity: 2,
        stock: 5,
      };

      const item3: CartItem = {
        id: '3',
        productId: 3,
        name: 'Martillo',
        price: 30,
        quantity: 1,
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
        result.current.addItem(item3);
      });

      expect(result.current.items).toHaveLength(3);

      act(() => {
        result.current.updateQuantity('1', 5);
        result.current.updateQuantity('2', 3);
      });

      expect(result.current.items[0].quantity).toBe(5);
      expect(result.current.items[1].quantity).toBe(3);

      act(() => {
        result.current.removeItem('2');
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items.find(i => i.id === '2')).toBeUndefined();
    });

    test('calcular total del carrito', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      const item1: CartItem = {
        id: '1',
        productId: 1,
        name: 'Taladro',
        price: 100,
        quantity: 2,
      };

      const item2: CartItem = {
        id: '2',
        productId: 2,
        name: 'Sierra',
        price: 50,
        quantity: 3,
      };

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      const total = result.current.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      expect(total).toBe(350); // (100*2) + (50*3) = 200 + 150 = 350
    });

    test('simula flujo completo de compra', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      // 1. Usuario agrega productos
      act(() => {
        result.current.addItem({
          id: '1',
          productId: 1,
          name: 'Taladro',
          price: 100,
          quantity: 1,
          stock: 10,
        });
      });

      expect(result.current.items).toHaveLength(1);

      // 2. Usuario agrega más del mismo producto
      act(() => {
        result.current.addItem({
          id: '1',
          productId: 1,
          name: 'Taladro',
          price: 100,
          quantity: 2,
          stock: 10,
        });
      });

      expect(result.current.items[0].quantity).toBe(3);

      // 3. Usuario cambia cantidad manualmente
      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);

      // 4. Usuario decide reducir cantidad
      act(() => {
        result.current.updateQuantity('1', 2);
      });

      expect(result.current.items[0].quantity).toBe(2);

      // 5. Usuario agrega otro producto
      act(() => {
        result.current.addItem({
          id: '2',
          productId: 2,
          name: 'Sierra',
          price: 50,
          quantity: 1,
          stock: 5,
        });
      });

      expect(result.current.items).toHaveLength(2);

      // 6. Usuario elimina un producto
      act(() => {
        result.current.removeItem('1');
      });

      expect(result.current.items).toHaveLength(1);

      // 7. Usuario completa compra y limpia carrito
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });
});