import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetail from '../components/ui/ProductDetail';

// Mock de fetch
global.fetch = jest.fn();

// Mock de CartContext
const mockAddItem = jest.fn();
let mockItems: Array<{ id: string; productId: number; name: string; price: number; quantity: number; }> = [];

jest.mock('../components/ui/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
    items: mockItems,
  }),
}));

const mockProducto = {
  idProducto: 1,
  nombreProducto: 'Taladro Profesional',
  precioProducto: 349.99,
  descripcionProducto: 'Taladro de alta potencia ideal para uso profesional',
  imagenProducto: 'https://example.com/taladro.jpg',
  slug: 'taladro-profesional',
  marca: 'DeWalt',
  stockProducto: 10,
};

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockItems = [];
    (global.fetch as jest.Mock).mockClear();
  });

  test('muestra estado de carga inicial', () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // No se resuelve para mantener loading
    );

    render(<ProductDetail slug="taladro-profesional" />);

    expect(screen.getByText(/cargando producto\.\.\./i)).toBeInTheDocument();
  });

  test('carga y muestra datos del producto correctamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('Taladro Profesional')).toBeInTheDocument();
    });

    expect(screen.getByText(/349\.99/)).toBeInTheDocument();
    expect(screen.getByText(/Taladro de alta potencia/i)).toBeInTheDocument();
    expect(screen.getByText('DeWalt')).toBeInTheDocument();
  });

  test('hace fetch a la URL correcta', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/public/productos/taladro-profesional')
      );
    });
  });

  test('maneja errores de carga', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<ProductDetail slug="producto-inexistente" />);

    await waitFor(() => {
      expect(screen.getByText(/cargando producto\.\.\./i)).toBeInTheDocument();
    });
  });

  test('muestra imagen del producto', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      const img = screen.getByAltText('Taladro Profesional') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toBe('https://example.com/taladro.jpg');
    });
  });

  test('muestra placeholder cuando no hay imagen', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockProducto,
        imagenProducto: undefined,
      }),
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('Sin imagen')).toBeInTheDocument();
    });
  });

  test('maneja error de carga de imagen', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      const img = screen.getByAltText('Taladro Profesional') as HTMLImageElement;
      fireEvent.error(img);
      expect(img.src).toContain('placeholder.com');
    });
  });

  test('muestra botón de agregar al carro', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/agregar al carro/i)).toBeInTheDocument();
    });
  });

  test('muestra información de envío gratuito', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/delivery gratis a compras mayores a s\/\. 200/i)).toBeInTheDocument();
    });
  });

  test('muestra secciones de información', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('Características')).toBeInTheDocument();
      expect(screen.getByText('Cuidados y Envío')).toBeInTheDocument();
      expect(screen.getByText('Descripción')).toBeInTheDocument();
    });
  });

  test('muestra controles de cantidad', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      const minusButton = screen.getByLabelText(/disminuir cantidad/i);
      const plusButton = screen.getByLabelText(/aumentar cantidad/i);
      
      expect(minusButton).toBeInTheDocument();
      expect(plusButton).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  test('incrementa y decrementa cantidad correctamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    const plusButton = screen.getByLabelText(/aumentar cantidad/i);
    const minusButton = screen.getByLabelText(/disminuir cantidad/i);

    // Incrementar
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();

    // Decrementar
    fireEvent.click(minusButton);
    expect(screen.getByText('1')).toBeInTheDocument();

    // No puede ir menor a 1
    fireEvent.click(minusButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('muestra stock disponible', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/stock: 10/i)).toBeInTheDocument();
    });
  });

  test('muestra "Sin stock" cuando no hay disponibilidad', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockProducto,
        stockProducto: 0,
      }),
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/sin stock/i)).toBeInTheDocument();
    });
  });

  test('deshabilita botón cuando no hay stock', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockProducto,
        stockProducto: 0,
      }),
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      const addButton = screen.getByText(/agregar al carro/i);
      expect(addButton).toBeDisabled();
    });
  });

  test('agrega producto al carrito con cantidad seleccionada', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('Taladro Profesional')).toBeInTheDocument();
    });

    // Incrementar cantidad a 3
    const plusButton = screen.getByLabelText(/aumentar cantidad/i);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);

    // Agregar al carrito
    const addButton = screen.getByText(/agregar al carro/i);
    fireEvent.click(addButton);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: '1',
      productId: 1,
      name: 'Taladro Profesional',
      price: 349.99,
      quantity: 3,
      image: 'https://example.com/taladro.jpg',
      stock: 10,
      brand: 'DeWalt',
      description: 'Taladro de alta potencia ideal para uso profesional',
    });
  });

  test('limita cantidad máxima según stock disponible', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockProducto,
        stockProducto: 3,
      }),
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    const plusButton = screen.getByLabelText(/aumentar cantidad/i);
    
    // Incrementar hasta el máximo (3)
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton); // Este no debería hacer nada
    fireEvent.click(plusButton); // Este tampoco

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('considera items en carrito para calcular stock disponible', async () => {
    mockItems = [
      { id: '1', productId: 1, name: 'Taladro Profesional', price: 349.99, quantity: 7 }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto, // stock: 10
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      // Stock máximo seleccionable = 10 - 7 = 3
      expect(screen.getByText(/stock: 3/i)).toBeInTheDocument();
    });
  });

  test('muestra precios con descuento del 10%', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockProducto,
        precioProducto: 100,
      }),
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      // Precio original (con 10% más): 110.00
      expect(screen.getByText(/110\.00/)).toBeInTheDocument();
      // Precio internet: 100.00
      expect(screen.getByText(/100\.00/)).toBeInTheDocument();
    });
  });

  test('muestra código del producto', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/código: 1/i)).toBeInTheDocument();
    });
  });

  test('muestra marca en sección de características', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/marca: dewalt/i)).toBeInTheDocument();
    });
  });

  test('muestra mensaje cuando no hay descripción', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockProducto,
        descripcionProducto: '',
      }),
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText(/sin descripción disponible/i)).toBeInTheDocument();
    });
  });

  test('resetea cantidad al cambiar de producto', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducto,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockProducto,
          idProducto: 2,
          nombreProducto: 'Sierra Circular',
          slug: 'sierra-circular',
        }),
      });

    const { rerender } = render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      expect(screen.getByText('Taladro Profesional')).toBeInTheDocument();
    });

    // Incrementar cantidad
    const plusButton = screen.getByLabelText(/aumentar cantidad/i);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Cambiar de producto
    rerender(<ProductDetail slug="sierra-circular" />);

    await waitFor(() => {
      expect(screen.getByText('Sierra Circular')).toBeInTheDocument();
    });

    // La cantidad debería resetearse a 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('muestra botón de favorito', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducto,
    });

    render(<ProductDetail slug="taladro-profesional" />);

    await waitFor(() => {
      const heartButton = screen.getByRole('button', { name: '' });
      expect(heartButton).toBeInTheDocument();
    });
  });
});