package com.sloan.backend.inventory;

import com.sloan.backend.model.Producto;
import com.sloan.backend.repository.ProductoRepository;
import com.sloan.backend.service.InventoryService;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

class InventoryServiceTest {

  ProductoRepository repo = mock(ProductoRepository.class);
  InventoryService service = new InventoryService(repo);

  @Test
  void reserveStock_decrements_whenAvailable() {
    Producto p = new Producto();
    p.setIdProducto(1L);
    p.setStockProducto(5);
    when(repo.findById(1L)).thenReturn(Optional.of(p));

    service.reserveStock(1L, 3);

    verify(repo).save(argThat(saved -> saved.getStockProducto() == 2));
  }

  @Test
  void reserveStock_throws_whenInsufficient() {
    Producto p = new Producto();
    p.setIdProducto(1L);
    p.setStockProducto(1);
    when(repo.findById(1L)).thenReturn(Optional.of(p));

    assertThatThrownBy(() -> service.reserveStock(1L, 2))
        .isInstanceOf(IllegalStateException.class)
        .hasMessageContaining("Stock insuficiente");
  }

  @Test
  void reserveStock_throws_whenProductNotFound() {
    when(repo.findById(99L)).thenReturn(Optional.empty());
    assertThatThrownBy(() -> service.reserveStock(99L, 1))
        .isInstanceOf(IllegalStateException.class)
        .hasMessageContaining("Producto no encontrado");
  }

  @Test
  void addStock_increments_properly() {
    Producto p = new Producto();
    p.setIdProducto(1L);
    p.setStockProducto(2);
    when(repo.findById(1L)).thenReturn(Optional.of(p));

    service.addStock(1L, 5);

    verify(repo).save(argThat(saved -> saved.getStockProducto() == 7));
  }

  @Test
  void addStock_throws_onNonPositiveQuantity() {
    assertThatThrownBy(() -> service.addStock(1L, 0))
        .isInstanceOf(IllegalArgumentException.class);
  }

  @Test
  void reserveStock_throws_onNonPositiveQuantity() {
    assertThatThrownBy(() -> service.reserveStock(1L, 0))
        .isInstanceOf(IllegalArgumentException.class);
  }
}