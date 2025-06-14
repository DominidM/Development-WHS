WHS Representaciones – Plataforma E-commerce para Productos de Gasfitería
===================================================================

Sloan_WebSystem es una solución web integral orientada al comercio electrónico de productos de gasfitería. El sistema abarca tanto el frontend de cara al cliente como el backend administrativo, garantizando una experiencia de usuario moderna y una gestión eficiente del negocio. Su arquitectura modular y escalable lo convierte en una herramienta robusta para empresas del rubro.

📁 Estructura del Proyecto
--------------------------
```bash
Sloan_WebSystem/
│
├── backend/      # Backend del sistema (API REST con Spring Boot)
├── frontend/     # Aplicación cliente (React + Vite)
├── docs/         # Documentación técnica (diagramas, manuales, etc.)
├── README.md     # Archivo actual
└── .env          # Variables de entorno (excluidas del control de versiones)
 ```
🔧 Tecnologías Utilizadas
--------------------------
- Frontend:
  - React
  - Vite
  - Tailwind CSS
  - TypeScript
  - Bun (gestor de paquetes)
  Interfaz dinámica y responsiva, construida a partir de un diseño en Figma. Permite a los usuarios explorar productos, registrarse, iniciar sesión y efectuar compras.

- Backend:
  - Java Spring Boot (Maven)
  - Spring Web (API RESTful)
  - Spring MVC + Thymeleaf (panel administrativo) 
  - Spring Data JPA
  - PostgreSQL Driver
  API modular que permite gestionar productos, clientes, ventas, reportes y solicitudes. Incluye un panel administrativo interno.

- Base de Datos:
  - PostgreSQL
  Motor relacional responsable del almacenamiento persistente de productos, usuarios, transacciones, estados, etc.

⚙️ Instalación del Proyecto
---------------------------
1. Clonar el Repositorio:
```bash 
git clone https://github.com/tu-usuario/Sloan_WebSystem.git
cd Sloan_WebSystem
```
2. Instalación de Dependencias

Frontend:
```bash 
cd frontend
bun install
```
Backend:
```bash 
Importar el proyecto como un proyecto Maven en tu IDE (por ejemplo, IntelliJ o Eclipse) y construirlo.
```

▶️ Ejecución del Proyecto
-------------------------
1. Configura la base de datos:

- Asegúrate de tener PostgreSQL instalado y corriendo.
- Crea la base de datos `sloan_web`.
- Configura las credenciales en el archivo `.env` o `application.properties`:
 
```bash 
spring.datasource.url=jdbc:postgresql://localhost:5432/sloan_web  
spring.datasource.username=TU_USUARIO  
spring.datasource.password=TU_CONTRASEÑA  
```

2. Ejecuta el Backend:
   
```bash 
cd backend  
./mvnw spring-boot:run

 ```
3. Ejecuta el Frontend:
   
```bash 
cd frontend  
bun run dev
```
Frontend disponible en: http://localhost:5173  
Backend disponible en: http://localhost:8081/admin/login

📚 Documentación
----------------
La carpeta `docs/` contiene:

- Diagramas entidad-relación
- Manual de usuario (cliente y administrador)
- Instrucciones de despliegue en producción
- Script para carga inicial de datos

🧪 Pruebas
----------
Si se han implementado pruebas en el frontend, ejecutarlas con:
```bash 
bun test
```
Para pruebas en el backend, emplear JUnit con Spring Boot Test desde el entorno de desarrollo.

🚀 Despliegue en Producción
---------------------------
Para compilar el frontend y servirlo desde el backend:
```bash 
cd frontend  
bun run build
```
Luego, configurar Spring Boot para servir los archivos estáticos desde `frontend/dist`.

Ejemplo básico en `WebConfig.java`:
```bash
@Configuration  
public class WebConfig implements WebMvcConfigurer {  
    @Override  
    public void addResourceHandlers(ResourceHandlerRegistry registry) {  
        registry.addResourceHandler("/**")  
            .addResourceLocations("classpath:/static/");  
    }  
}
```
Coloca los archivos generados en `frontend/dist` dentro de `backend/src/main/resources/static`.

📌 Licencia
-----------
Este proyecto está licenciado bajo la Licencia MIT: https://opensource.org/licenses/MIT

Desarrollado por  
Dominid – Estudiante de Ingeniería en Sistemas  
© 2025 SolveGrades
