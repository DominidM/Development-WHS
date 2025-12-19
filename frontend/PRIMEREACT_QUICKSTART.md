# Guía de Inicio Rápido - PrimeReact

## Configuración Inicial

### 1. Importar Temas y Estilos

En tu archivo `main.tsx` o `App.tsx`, importa los estilos necesarios:

```tsx
// Tema de PrimeReact (usando PrimeUI X)
import 'primereact/resources/themes/lara-light-blue/theme.css';

// Core CSS de PrimeReact
import 'primereact/resources/primereact.min.css';

// Iconos de PrimeReact
import 'primeicons/primeicons.css';
```

### 2. Configuración de Temas PrimeUI X (Opcional)

Para usar el nuevo sistema de temas de PrimeUI X:

```tsx
import { PrimeReactProvider } from 'primereact/api';
import Aura from '@primeuix/themes/aura';

function App() {
  return (
    <PrimeReactProvider value={{ theme: Aura }}>
      {/* Tu aplicación */}
    </PrimeReactProvider>
  );
}
```

## Ejemplos de Uso

### Ejemplo 1: Botón Simple

```tsx
import { Button } from 'primereact/button';

function MyComponent() {
  return (
    <div>
      <Button label="Guardar" icon="pi pi-check" />
      <Button label="Cancelar" icon="pi pi-times" severity="danger" />
    </div>
  );
}
```

### Ejemplo 2: Tabla de Datos (DataTable)

```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

function ProductTable() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Producto A', price: 100, category: 'Gasfitería' },
    { id: 2, name: 'Producto B', price: 200, category: 'Sanitarios' },
    { id: 3, name: 'Producto C', price: 150, category: 'Accesorios' }
  ]);

  return (
    <DataTable 
      value={products} 
      paginator 
      rows={10}
      tableStyle={{ minWidth: '50rem' }}
    >
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Nombre" sortable filter />
      <Column field="price" header="Precio" sortable />
      <Column field="category" header="Categoría" sortable filter />
    </DataTable>
  );
}
```

### Ejemplo 3: Diálogo Modal

```tsx
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';

function DialogExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button label="Mostrar" onClick={() => setVisible(true)} />
      
      <Dialog 
        header="Confirmación" 
        visible={visible} 
        onHide={() => setVisible(false)}
        style={{ width: '50vw' }}
      >
        <p>¿Está seguro de que desea continuar?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button label="No" severity="secondary" onClick={() => setVisible(false)} />
          <Button label="Sí" onClick={() => setVisible(false)} />
        </div>
      </Dialog>
    </div>
  );
}
```

### Ejemplo 4: Formulario con Validación

```tsx
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';

function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    date: null,
    category: null
  });

  const categories = [
    { label: 'Gasfitería', value: 'gasfiteria' },
    { label: 'Sanitarios', value: 'sanitarios' },
    { label: 'Accesorios', value: 'accesorios' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="name" className="block mb-2">Nombre</label>
        <InputText 
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="date" className="block mb-2">Fecha</label>
        <Calendar 
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.value})}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-2">Categoría</label>
        <Dropdown 
          id="category"
          value={formData.category}
          options={categories}
          onChange={(e) => setFormData({...formData, category: e.value})}
          placeholder="Seleccione una categoría"
          className="w-full"
        />
      </div>

      <Button type="submit" label="Enviar" />
    </form>
  );
}
```

## Combinando con Tailwind CSS

PrimeReact funciona perfectamente con Tailwind CSS:

```tsx
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function ProductCard() {
  return (
    // Tailwind para layout y espaciado
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* PrimeReact para componentes */}
      <Card 
        title="Producto 1"
        subTitle="Gasfitería"
        footer={<Button label="Ver más" />}
        header={<img alt="Card" src="/product.jpg" />}
        className="shadow-lg" // Tailwind classes
      >
        <p className="m-0 text-gray-600"> {/* Tailwind classes */}
          Descripción del producto aquí.
        </p>
      </Card>
    </div>
  );
}
```

## Temas Disponibles

PrimeUI X ofrece varios temas pre-construidos:

- **Aura** (Nuevo diseño moderno)
- **Lara** (Light/Dark)
- **Material** (Material Design)
- **Bootstrap** (Bootstrap style)
- **Nano** (Minimalista)

Para cambiar el tema, simplemente importa otro:

```tsx
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
```

## Personalización de Temas

Puedes personalizar los colores del tema:

```tsx
import { PrimeReactProvider } from 'primereact/api';
import Aura from '@primeuix/themes/aura';

const customTheme = {
  ...Aura,
  primitive: {
    ...Aura.primitive,
    blue: {
      50: '#f5f9ff',
      500: '#0d3c6b', // Color primario de tu proyecto
      600: '#0a2f52',
    }
  }
};

function App() {
  return (
    <PrimeReactProvider value={{ theme: customTheme }}>
      {/* Tu aplicación */}
    </PrimeReactProvider>
  );
}
```

## Componentes Más Utilizados

### Componentes de Entrada
- **InputText**: Campo de texto
- **InputTextarea**: Área de texto
- **InputNumber**: Número
- **Calendar**: Selector de fecha
- **Dropdown**: Lista desplegable
- **MultiSelect**: Selección múltiple
- **Checkbox**: Casilla de verificación
- **RadioButton**: Botón de radio

### Componentes de Datos
- **DataTable**: Tabla de datos completa
- **DataView**: Vista de datos personalizable
- **TreeTable**: Tabla de árbol
- **Paginator**: Paginación

### Componentes de Overlay
- **Dialog**: Modal/Diálogo
- **OverlayPanel**: Panel flotante
- **Sidebar**: Panel lateral
- **Toast**: Notificaciones

### Componentes de Navegación
- **Menu**: Menú
- **Menubar**: Barra de menú
- **TabView**: Pestañas
- **Steps**: Pasos

## Recursos

- [Documentación oficial de PrimeReact](https://primereact.org/)
- [Showcase de componentes](https://primereact.org/showcase/)
- [Temas PrimeUI X](https://primereact.org/theming/)
- [GitHub de PrimeReact](https://github.com/primefaces/primereact)

## Notas Importantes

1. **Compatibilidad**: PrimeReact es compatible con React 18+ (este proyecto usa React 19)
2. **TypeScript**: PrimeReact tiene soporte completo de TypeScript
3. **Tailwind**: PrimeReact funciona perfectamente con Tailwind CSS
4. **Bundle Size**: Importa solo los componentes que uses para optimizar el tamaño del bundle

## Siguiente Paso

¡Comienza a usar PrimeReact en tus componentes! Consulta la documentación oficial para más ejemplos y opciones de personalización.
