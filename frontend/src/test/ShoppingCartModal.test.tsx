import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { ShoppingCartModal } from '../components/Layout/ShoppingCartModal';

// Mock del CartContext
const mockRemoveItem = jest.fn();
const mockUpdateQuantity = jest.fn();

let mockItems: Array<{ id: string; productId: number; name: string; price: number; quantity: number; image?: string; }> = [];

jest.mock('../components/ui/CartContext', () => ({
  useCart: () => ({
    items: mockItems,
    removeItem: mockRemoveItem,
    updateQuantity: mockUpdateQuantity,
  }),
}));

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('ShoppingCartModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockItems = [];
    Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });
  });

  test('estado vacío: muestra mensaje y permite cerrar con "Ver carrito"', () => {
    const onClose = jest.fn();
    mockItems = [];

    renderWithRouter(<ShoppingCartModal onClose={onClose} />);

    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();

    const linkVerCarrito = screen.getByRole('link', { name: /ver carrito/i });
    fireEvent.click(linkVerCarrito);
    expect(onClose).toHaveBeenCalledTimes(1);

    const closeBtn = screen.getAllByRole('button')[0];
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('muestra ítems y calcula subtotal; "Ir a mi carrito" cierra el modal', () => {
    const onClose = jest.fn();
    mockItems = [
      { id: '101', productId: 101, name: 'Taladro', price: 100, quantity: 2, image: '/bad.png' },
      { id: '202', productId: 202, name: 'Sierra',  price:  50, quantity: 1 },
    ];

    renderWithRouter(<ShoppingCartModal onClose={onClose} />);

    expect(screen.getByText(/taladro/i)).toBeInTheDocument();
    expect(screen.getByText(/sierra/i)).toBeInTheDocument();
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/S\/\s*250\.00/)).toBeInTheDocument();

    const irACarrito = screen.getByRole('link', { name: /ir a mi carrito/i });
    fireEvent.click(irACarrito);
    expect(onClose).toHaveBeenCalled();
  });

  test('control de cantidades y eliminación', () => {
    const onClose = jest.fn();
    mockItems = [
      { id: '101', productId: 101, name: 'Taladro', price: 100, quantity: 2 },
      { id: '202', productId: 202, name: 'Sierra',  price:  50, quantity: 1 },
    ];

    renderWithRouter(<ShoppingCartModal onClose={onClose} />);

    const rowSierra = screen.getByText(/sierra/i).closest('li') as HTMLElement;
    const btnsSierra = within(rowSierra).getAllByRole('button'); // [-, +, eliminar]
    const minusSierra = btnsSierra[0];
    const plusSierra  = btnsSierra[1];
    const removeSierra = within(rowSierra).getByTitle(/eliminar/i);

    expect(minusSierra).toBeDisabled();

    fireEvent.click(plusSierra);
    expect(mockUpdateQuantity).toHaveBeenCalledWith('202', 2);

    fireEvent.click(removeSierra);
    expect(mockRemoveItem).toHaveBeenCalledWith('202');

    const rowTaladro = screen.getByText(/taladro/i).closest('li') as HTMLElement;
    const minusTaladro = within(rowTaladro).getAllByRole('button')[0];
    fireEvent.click(minusTaladro);
    expect(mockUpdateQuantity).toHaveBeenCalledWith('101', 1);
  });

  test('si la imagen falla, se reemplaza por placeholder', () => {
    const onClose = jest.fn();
    mockItems = [
      { id: '101', productId: 101, name: 'Taladro', price: 100, quantity: 1, image: '/bad.png' },
    ];

    renderWithRouter(<ShoppingCartModal onClose={onClose} />);

    const img = screen.getByRole('img', { name: /taladro/i }) as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toMatch(/placeholder\.com\/80x80/i);
  });
});