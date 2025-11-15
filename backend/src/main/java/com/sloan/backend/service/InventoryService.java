package com.sloan.backend.service;

import com.sloan.backend.model.Producto;
import com.sloan.backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

  private final ProductoRepository productoRepository;

  public InventoryService(ProductoRepository productoRepository) {
    this.productoRepository = productoRepository;
  }

  /**
   * Reserva stock restando la cantidad indicada del producto.
   * - Lanza IllegalArgumentException si cantidad <= 0.
   * - Lanza IllegalStateException si el producto no existe o no hay stock suficiente.
   */
  @Transactional
  public void reserveStock(Long idProducto, int cantidad) {
    if (cantidad <= 0) {
      throw new IllegalArgumentException("La cantidad a reservar debe ser mayor que 0");
    }

    Producto producto = productoRepository.findById(idProducto)
        .orElseThrow(() -> new IllegalStateException("Producto no encontrado: " + idProducto));

    Integer stockActual = producto.getStockProducto() == null ? 0 : producto.getStockProducto();
    if (stockActual < cantidad) {
      throw new IllegalStateException("Stock insuficiente. Actual: " + stockActual + ", requerido: " + cantidad);
    }

    producto.setStockProducto(stockActual - cantidad);
    productoRepository.save(producto);
  }

  /**
   * Incrementa stock sumando la cantidad indicada.
   * - Lanza IllegalArgumentException si cantidad <= 0.
   * - Lanza IllegalStateException si el producto no existe.
   */
  @Transactional
  public void addStock(Long idProducto, int cantidad) {
    if (cantidad <= 0) {
      throw new IllegalArgumentException("La cantidad a incrementar debe ser mayor que 0");
    }

    Producto producto = productoRepository.findById(idProducto)
        .orElseThrow(() -> new IllegalStateException("Producto no encontrado: " + idProducto));

    Integer stockActual = producto.getStockProducto() == null ? 0 : producto.getStockProducto();
    producto.setStockProducto(stockActual + cantidad);
    productoRepository.save(producto);
  }
}