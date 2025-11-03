import React, { useEffect, useState } from 'react';

type Settings = {
  textScale: 1 | 2 | 3; // 1 = normal, 2 = medio, 3 = grande
  colorblind: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  linkUnderline: boolean;
};

const STORAGE_KEY = 'site_accessibility_settings_v1';
const defaultSettings: Settings = {
  textScale: 1,
  colorblind: false,
  highContrast: false,
  reducedMotion: false,
  linkUnderline: false,
};

const loadSettings = (): Settings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    return JSON.parse(raw) as Settings;
  } catch {
    return defaultSettings;
  }
};

const saveSettings = (s: Settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
};

/**
 * AccessibilityButton Mejorado
 * - Soporta: tamaño de letra (3 niveles), modo daltonismo, alto contraste,
 *   reducir movimiento y subrayar enlaces.
 * - Persiste en localStorage.
 * - Aplica clases al <html> (document.documentElement) para afectar toda la app.
 * - Posicionamiento: se usa flex-col-reverse para que los elementos flotantes se apilen
 *   de abajo hacia arriba (panel encima del botón), evitando solapamientos visuales.
 */
const AccessibilityButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    applySettingsToRoot(s);
    injectRootStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applySettingsToRoot = (s: Settings) => {
    const root = document.documentElement;
    root.classList.remove('acc-text-1', 'acc-text-2', 'acc-text-3');
    root.classList.add(`acc-text-${s.textScale}`);

    if (s.colorblind) root.classList.add('acc-colorblind');
    else root.classList.remove('acc-colorblind');

    if (s.highContrast) root.classList.add('acc-high-contrast');
    else root.classList.remove('acc-high-contrast');

    if (s.reducedMotion) root.classList.add('acc-reduced-motion');
    else root.classList.remove('acc-reduced-motion');

    if (s.linkUnderline) root.classList.add('acc-link-underline');
    else root.classList.remove('acc-link-underline');
  };

  const updateSettings = (next: Settings) => {
    setSettings(next);
    applySettingsToRoot(next);
    saveSettings(next);
  };

  const injectRootStyles = () => {
    if (document.getElementById('accessibility-root-styles')) return;
    const style = document.createElement('style');
    style.id = 'accessibility-root-styles';
    style.innerHTML = `
      /* Text scaling (affects rem-based Tailwind sizes) */
      .acc-text-1 { font-size: 100%; } /* normal */
      .acc-text-2 { font-size: 115%; } /* medio */
      .acc-text-3 { font-size: 130%; } /* grande */

      /* Daltonismo / ligero ajuste de saturación y contraste */
      .acc-colorblind { filter: contrast(1.05) saturate(0.95); }
      .acc-colorblind button, .acc-colorblind a { text-decoration-thickness: 1.6px; }

      /* Alto contraste más agresivo */
      .acc-high-contrast { filter: contrast(1.3) !important; }
      .acc-high-contrast button, .acc-high-contrast a {
        border-width: 2px !important;
        font-weight: 600 !important;
      }

      /* Reducir movimiento */
      .acc-reduced-motion * {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }

      /* Subrayar enlaces y botones (útil para identificar enlaces) */
      .acc-link-underline a { text-decoration: underline !important; }
      .acc-link-underline button { text-decoration: underline !important; }
    `;
    document.head.appendChild(style);
  };

  const updateTextScale = (scale: 1 | 2 | 3) => updateSettings({ ...settings, textScale: scale });
  const toggleColorblind = () => updateSettings({ ...settings, colorblind: !settings.colorblind });
  const toggleHighContrast = () => updateSettings({ ...settings, highContrast: !settings.highContrast });
  const toggleReducedMotion = () => updateSettings({ ...settings, reducedMotion: !settings.reducedMotion });
  const toggleLinkUnderline = () => updateSettings({ ...settings, linkUnderline: !settings.linkUnderline });
  const cycleTextScale = () => {
    const next = settings.textScale === 3 ? 1 : ((settings.textScale + 1) as 1 | 2 | 3);
    updateSettings({ ...settings, textScale: next });
  };
  const reset = () => updateSettings(defaultSettings);

  return (
    <div
      // flex-col-reverse hace que los hijos se apilen desde abajo hacia arriba: el primer hijo queda en la base
      className="fixed right-20 bottom-6 z-60 flex flex-col-reverse items-end gap-1 pointer-events-auto"
      aria-hidden={false}
    >
      {/* Botón flotante principal (icono universal / persona) */}
      <button
        aria-expanded={open}
        aria-controls="accessibility-panel"
        title="Opciones de Accesibilidad"
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
      >
        {/* Icono accesibilidad */}
        <svg
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
          <path d="M12 10v8M12 18l-3 3M12 18l3 3M8 13h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Panel (aparece encima del botón) */}
      <div
        id="accessibility-panel"
        role="region"
        aria-label="Opciones de accesibilidad"
        className={`transform origin-bottom-right transition-all duration-200 ${open ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'} bg-white shadow-2xl rounded-xl p-4 w-72 border border-slate-200`}
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
          <div className="text-base font-semibold text-slate-800">Accesibilidad</div>
          <button
            onClick={reset}
            className="text-xs text-sky-600 hover:text-sky-700 font-medium focus:outline-none hover:underline"
            aria-label="Restaurar ajustes de accesibilidad"
          >
            Restaurar
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Tamaño de letra</div>
              <div className="text-sm font-medium text-slate-800">
                {settings.textScale === 1 ? 'Normal' : settings.textScale === 2 ? 'Medio' : 'Grande'}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateTextScale(1)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${settings.textScale === 1 ? 'bg-sky-600 text-white border-sky-700 shadow-sm' : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'}`}
                aria-pressed={settings.textScale === 1}
                aria-label="Tamaño normal"
              >
                A
              </button>
              <button
                onClick={() => updateTextScale(2)}
                className={`px-2.5 py-1.5 rounded-lg text-sm font-medium border-2 transition-all ${settings.textScale === 2 ? 'bg-sky-600 text-white border-sky-700 shadow-sm' : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'}`}
                aria-pressed={settings.textScale === 2}
                aria-label="Tamaño medio"
              >
                A
              </button>
              <button
                onClick={() => updateTextScale(3)}
                className={`px-2.5 py-1.5 rounded-lg text-base font-medium border-2 transition-all ${settings.textScale === 3 ? 'bg-sky-600 text-white border-sky-700 shadow-sm' : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400'}`}
                aria-pressed={settings.textScale === 3}
                aria-label="Tamaño grande"
              >
                A
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Modo daltonismo</div>
              <div className="text-sm font-medium text-slate-800">Mejor contraste</div>
            </div>
            <button
              onClick={toggleColorblind}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${settings.colorblind ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'}`}
              aria-pressed={settings.colorblind}
            >
              {settings.colorblind ? '✓ Activado' : 'Activar'}
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Alto contraste</div>
              <div className="text-sm font-medium text-slate-800">Mayor visibilidad</div>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${settings.highContrast ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'}`}
              aria-pressed={settings.highContrast}
            >
              {settings.highContrast ? '✓ Activado' : 'Activar'}
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Reducir movimiento</div>
              <div className="text-sm font-medium text-slate-800">Sin animaciones</div>
            </div>
            <button
              onClick={toggleReducedMotion}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${settings.reducedMotion ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'}`}
              aria-pressed={settings.reducedMotion}
            >
              {settings.reducedMotion ? '✓ Activado' : 'Activar'}
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div className="flex-1">
              <div className="text-xs text-slate-500 mb-1">Subrayar enlaces</div>
              <div className="text-sm font-medium text-slate-800">Mejor identificación</div>
            </div>
            <button
              onClick={toggleLinkUnderline}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${settings.linkUnderline ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'}`}
              aria-pressed={settings.linkUnderline}
            >
              {settings.linkUnderline ? '✓ Activado' : 'Activar'}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={cycleTextScale}
              className="w-full text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 py-2 rounded-lg border border-slate-200 transition-colors"
            >
              ⚡ Cambiar tamaño rápido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityButton;