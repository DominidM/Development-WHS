import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccessibilityButton from './../components/Layout/AccesibilityButton';

const STORAGE_KEY = 'site_accessibility_settings_v1';

describe('AccessibilityButton - TDD: modo daltonismo', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    localStorage.clear();
    jest.resetModules();
  });

  test('activa el modo daltonismo: aplica clase y persiste en localStorage', () => {
    // Arrange
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

    render(<AccessibilityButton />);

    const mainButton = screen.getByTitle('Opciones de Accesibilidad');
    expect(mainButton).toBeInTheDocument();

    fireEvent.click(mainButton);

    // 1) Localizamos el texto "Modo daltonismo"
    const label = screen.getByText('Modo daltonismo');

    // 2) Subimos al contenedor que tiene también el botón (dos niveles)
    const colorblindSection = label.closest('.flex.items-center.justify-between') as HTMLElement | null;
    expect(colorblindSection).not.toBeNull();

    // 3) Dentro de ese contenedor buscamos el botón "Activar"
    const colorblindButton = within(colorblindSection as HTMLElement).getByRole('button', {
      name: /Activar/i,
    });
    expect(colorblindButton).toBeInTheDocument();

    // Act
    fireEvent.click(colorblindButton);

    // Assert 1: clase en <html>
    const html = document.documentElement;
    expect(html.classList.contains('acc-colorblind')).toBe(true);

    // Assert 2: persistencia en localStorage
    const savedRaw = localStorage.getItem(STORAGE_KEY);
    expect(savedRaw).not.toBeNull();

    const saved = JSON.parse(savedRaw!);
    expect(saved.colorblind).toBe(true);
    expect(saved.textScale).toBe(1);
    expect(saved.highContrast).toBe(false);
    expect(saved.reducedMotion).toBe(false);
    expect(saved.linkUnderline).toBe(false);
  });
});