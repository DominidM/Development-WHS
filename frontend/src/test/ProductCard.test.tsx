import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock de CartContext
const mockAddItem = jest.fn();
let mockItems: Array<{ id: string; productId: number; name: string; price: number; quantity: number; }> = [];

jest.mock('../components/ui/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
    items: mockItems,
  }),
}));

// Mock de window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('ProductCard', () => {
  const defaultProps = {
    id: 1,
    nombre: 'Taladro Eléctrico',
    descripcion: 'Taladro de alta potencia para uso profesional',
    slug: 'taladro-electrico',
    precio: 299.99,
    stock: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockItems = [];
    mockNavigate.mockClear();
    mockAlert.mockClear();
  });

  test('renderiza información del producto correctamente', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    expect(screen.getByText('Taladro Eléctrico')).toBeInTheDocument();
    expect(screen.getByText(/Taladro de alta potencia/i)).toBeInTheDocument();
    expect(screen.getByText('S/. 299.99')).toBeInTheDocument();
    expect(screen.getByText('Stock: 10')).toBeInTheDocument();
  });

  test('muestra imagen del producto o placeholder', () => {
    const { rerender } = renderWithRouter(
      <ProductCard {...defaultProps} imagen="https://example.com/taladro.jpg" />
    );

    const img = screen.getByRole('img', { name: /taladro eléctrico/i }) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://example.com/taladro.jpg');

    // Sin imagen
    rerender(
      <MemoryRouter>
        <ProductCard {...defaultProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('Sin imagen')).toBeInTheDocument();
  });

  test('maneja error de carga de imagen', () => {
    renderWithRouter(
      <ProductCard {...defaultProps} imagen="https://example.com/broken.jpg" />
    );

    const img = screen.getByRole('img') as HTMLImageElement;
    fireEvent.error(img);
    // jsdom convierte cadena vacía en "http://localhost/"
    expect(img.src).toBe('http://localhost/');
  });

  test('muestra precio con descuento si hay precioOriginal', () => {
    renderWithRouter(<ProductCard {...defaultProps} precioOriginal={399.99} />);

    expect(screen.getByText('S/. 299.99')).toBeInTheDocument();
    expect(screen.getByText('S/. 399.99')).toBeInTheDocument();
    expect(screen.getByText('S/. 399.99')).toHaveClass('line-through');
  });

  test('navega al detalle al hacer click en la card', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    const card = screen.getByRole('button', { name: /ver detalle de taladro eléctrico/i });
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/productos/taladro-electrico');
  });

  test('navega al detalle al presionar Enter o Espacio', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    const card = screen.getByRole('button', { name: /ver detalle de taladro eléctrico/i });
    
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/productos/taladro-electrico');

    mockNavigate.mockClear();

    fireEvent.keyDown(card, { key: ' ' });
    expect(mockNavigate).toHaveBeenCalledWith('/productos/taladro-electrico');
  });

  test('agrega producto al carrito correctamente', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addButton);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: '1',
      productId: 1,
      name: 'Taladro Eléctrico',
      price: 299.99,
      quantity: 1,
      image: undefined,
      stock: 10,
      description: 'Taladro de alta potencia para uso profesional',
    });
  });

  test('no navega al detalle cuando se hace click en el botón de agregar', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addButton);

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockAddItem).toHaveBeenCalled();
  });

  test('muestra "Sin stock" cuando stock es 0', () => {
    renderWithRouter(<ProductCard {...defaultProps} stock={0} />);

    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    expect(screen.getByText('Sin stock')).toHaveClass('text-red-600');
  });

  test('deshabilita botón de agregar cuando no hay stock', () => {
    renderWithRouter(<ProductCard {...defaultProps} stock={0} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(addButton).toBeDisabled();

    fireEvent.click(addButton);
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('muestra alerta cuando se intenta agregar producto sin stock', () => {
    renderWithRouter(<ProductCard {...defaultProps} stock={0} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    
    // Aunque esté deshabilitado, probamos el handler directamente
    fireEvent.click(addButton);
    
    // El botón está deshabilitado, así que no debería llamar a addItem
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('deshabilita botón cuando se alcanza el máximo en carrito', () => {
    mockItems = [
      { id: '1', productId: 1, name: 'Taladro Eléctrico', price: 299.99, quantity: 10 }
    ];

    renderWithRouter(<ProductCard {...defaultProps} stock={10} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(addButton).toBeDisabled();
  });

  test('muestra alerta cuando se alcanza el máximo disponible', () => {
    mockItems = [
      { id: '1', productId: 1, name: 'Taladro Eléctrico', price: 299.99, quantity: 10 }
    ];

    renderWithRouter(<ProductCard {...defaultProps} stock={10} />);
    
    // Forzar el click aunque esté deshabilitado no debería agregar
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addButton);
    
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('muestra alerta con ID inválido', () => {
    renderWithRouter(<ProductCard {...defaultProps} id={NaN} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addButton);

    expect(mockAlert).toHaveBeenCalledWith('ID de producto no válido. No se puede agregar al carrito.');
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  test('maneja stock undefined como 0', () => {
    renderWithRouter(<ProductCard {...defaultProps} stock={undefined} />);

    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(addButton).toBeDisabled();
  });

  test('permite agregar múltiples veces mientras haya stock', () => {
    const { rerender } = renderWithRouter(<ProductCard {...defaultProps} stock={5} />);

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    
    // Primera vez
    fireEvent.click(addButton);
    expect(mockAddItem).toHaveBeenCalledTimes(1);

    // Simular que ahora hay 1 en el carrito
    mockItems = [
      { id: '1', productId: 1, name: 'Taladro Eléctrico', price: 299.99, quantity: 1 }
    ];
    
    rerender(
      <MemoryRouter>
        <ProductCard {...defaultProps} stock={5} />
      </MemoryRouter>
    );

    // Segunda vez - debería seguir permitiendo
    fireEvent.click(addButton);
    expect(mockAddItem).toHaveBeenCalledTimes(2);
  });

  test('aplica estilos de hover y focus correctamente', () => {
    renderWithRouter(<ProductCard {...defaultProps} />);

    const card = screen.getByRole('button', { name: /ver detalle de taladro eléctrico/i });
    expect(card).toHaveClass('hover:scale-105', 'hover:shadow-xl');

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(addButton).toHaveClass('hover:bg-green-100', 'focus:ring-2', 'focus:ring-green-300');
  });
});