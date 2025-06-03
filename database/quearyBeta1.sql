-- Tabla de roles de usuario
CREATE TABLE RolUsuario (
    idRolUsuario SERIAL PRIMARY KEY,
    nombreRol VARCHAR(50) NOT NULL -- Ejemplo: 'Cliente', 'Administrador'
);

CREATE TABLE Usuario (
    idUsuario SERIAL PRIMARY KEY,
    correoPersona VARCHAR(100) UNIQUE NOT NULL, -- Se usa como login
    password VARCHAR(255) NOT NULL,             -- Encriptada
    nombrePersona VARCHAR(100) NOT NULL,        -- Nombre real
    pk_rolUsuario INT NOT NULL,
    FOREIGN KEY (pk_rolUsuario) REFERENCES Rol_Usuario(id_rol_usuario)
);


ALTER TABLE Usuario RENAME COLUMN correopersona TO correo_persona;

-- Tabla de tipos de formulario
CREATE TABLE TipoForm (
    idTipoForm SERIAL PRIMARY KEY,
    nombreTipo VARCHAR(100) NOT NULL -- Ejemplo: 'Libro de Reclamaciones', 'Opinión', 'Contacto'
);

-- Tabla de estados de formulario
CREATE TABLE EstadoForm (
    idEstadoForm SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL, -- Ejemplo: 'SIN_ATENDER', 'ATENDIDO'
    text_estado TEXT -- Respuesta opcional del personal
);

-- Tabla de formularios
CREATE TABLE Formulario (
    id_formulario SERIAL PRIMARY KEY,
	correo_formulario VARCHAR(100),
	dni_formulario VARCHAR(20) NOT NULL,
    fecha_formulario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    telefono_formulario VARCHAR(20),
    
    pk_tipo_formulario INT NOT NULL,
    FOREIGN KEY (pk_tipo_formulario) REFERENCES tipo_form(id_tipo_form),
    
    pk_estado_formulario INT NOT NULL DEFAULT 1, -- Estado por defecto: SIN_ATENDER
    FOREIGN KEY (pk_estado_formulario) REFERENCES estado_form(id_estado_form),
    
    text_estado TEXT, -- Comentario o respuesta del personal

    user_atencion INT, -- Usuario que responde (solo debe ser un ADMIN)
    FOREIGN KEY (user_atencion) REFERENCES usuario(id_Usuario)
);


INSERT INTO RolUsuario (nombreRol)
VALUES 
  ('Cliente'),
  ('Administrador');


INSERT INTO tipo_form (nombre_Tipo)
VALUES 
  ('Reclamo Producto'),
  ('Reclamo Servicio'),
  ('Reclamo Instalacion'),
  ('Opiniones de Clientes'),
  ('Contacto');


  INSERT INTO estado_form (nombre_estado, text_estado)
VALUES 
  ('SIN_ATENDER', NULL),
  ('ATENDIDO', NULL);


select * from usuario

INSERT INTO usuario (correo_persona, nombre_persona, password, pk_rol_usuario)
VALUES (
  'dominidzero@gmail.com', 
  'Dominid Muñoz', 
  '$2a$10$7auZAsogUrOro3LksgRFgeGyNuujynNvultzEkGxSMarsT3bjxBES', -- contraseña: admin123
  2
);


DELETE FROM tipo_form;
-- Para PostgreSQL:

ALTER SEQUENCE tipo_form_id_tipo_form_seq RESTART WITH 1;

SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema='public';





-- Tabla: Estado_P 
CREATE TABLE Estado_P (
    idEstado_P BIGSERIAL PRIMARY KEY,
    nombreEstado_P VARCHAR(100) NOT NULL
);


INSERT INTO Estado_P (nombreEstado_P) VALUES
('Activo'),
('Agotado'),
('No Activo');


-- Tabla: Categoria_P 
CREATE TABLE Categoria_P (
    idCategoria_P BIGSERIAL PRIMARY KEY,
    nombreCategoria_P VARCHAR(100) NOT NULL
);

INSERT INTO Categoria_P (nombreCategoria_P) VALUES
('Duchas'),
('Tubos'),
('Fluxómetros'),
('Lavamanos'),
('Válvulas');


-- Tabla: Marca_P 
CREATE TABLE Marca_P (
    idMarca_P BIGSERIAL PRIMARY KEY,
    nombreMarca_P VARCHAR(50) NOT NULL
);


INSERT INTO Marca_P (nombreMarca_P) VALUES
('Sloan'),
('Genebre'),
('Vainsa'),
('Trébol'),
('Helvex'),
('Leeyes'),
('Sunmixer');

CREATE TABLE MetodoPago (
    idMetodoPago BIGSERIAL PRIMARY KEY,
    nombreMetodoPago VARCHAR(100) NOT NULL
);

INSERT INTO MetodoPago (nombreMetodoPago) VALUES
('Efectivo'),
('Tarjeta'),
('Yape');


-- Tabla: ExtraServicio
CREATE TABLE ExtraServicio (
    idServicio BIGSERIAL PRIMARY KEY,
    nombreServicio VARCHAR(100) NOT NULL
);


INSERT INTO ExtraServicio (nombreServicio) VALUES
('Instalación'),
('Envío a domicilio'),
('Recojo en tienda');


-- Tabla: Pedido
CREATE TABLE Pedido (
    idPedido BIGSERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pk_Extra BIGINT NOT NULL,
    pk_Usuario BIGINT NOT NULL,
    pk_MetodoPago BIGINT NOT NULL,
    CONSTRAINT fk_pedido_extra FOREIGN KEY (pk_Extra) REFERENCES ExtraServicio(idServicio),
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (pk_Usuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT fk_pedido_metodo FOREIGN KEY (pk_MetodoPago) REFERENCES MetodoPago(idMetodoPago)
);

-- Tabla: Producto
CREATE TABLE Producto (
    idProducto BIGSERIAL PRIMARY KEY,
    nombreProducto VARCHAR(150) NOT NULL,
    precioProducto NUMERIC(10, 2) NOT NULL,
    descripcionProducto TEXT,
    imagenProducto VARCHAR(255),
    stockProducto INT,
    pk_categoriaProducto BIGINT NOT NULL,
    pk_marcaProducto BIGINT NOT NULL,
    pk_estadoProducto BIGINT NOT NULL,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (pk_categoriaProducto) REFERENCES Categoria_P(idCategoria_P),
    CONSTRAINT fk_producto_marca FOREIGN KEY (pk_marcaProducto) REFERENCES Marca_P(idMarca_P),
    CONSTRAINT fk_producto_estado FOREIGN KEY (pk_estadoProducto) REFERENCES Estado_P(idEstado_P)
);

-- Tabla: PedidoDetalles
CREATE TABLE PedidoDetalles (
    idPedidoDetalle BIGSERIAL PRIMARY KEY,
    cantidadPedido INT NOT NULL,
    pk_ProductoPedido BIGINT NOT NULL,
    pk_Pedido BIGINT NOT NULL,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (pk_ProductoPedido) REFERENCES Producto(idProducto),
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (pk_Pedido) REFERENCES Pedido(idPedido)
);

 

UPDATE usuario SET password = '$2a$10$V0nL4yRRZf8N2Qk2ZJqg4uNfZtJ1i4EiFq/1o4VZkV9Wf4T7u6e1G' WHERE correopersona = 'dominidzero@gmail.com';


ALTER TABLE usuario ADD COLUMN nombre_persona VARCHAR(100);
ALTER TABLE usuario ADD COLUMN pk_rol_usuario BIGINT;


UPDATE usuario SET nombre_persona = 'Temporal' WHERE nombre_persona IS NULL;
UPDATE usuario SET pk_rol_usuario = 1 WHERE pk_rol_usuario IS NULL; -- usa un rol válido

ALTER TABLE usuario ALTER COLUMN nombre_persona SET NOT NULL;
ALTER TABLE usuario ALTER COLUMN pk_rol_usuario SET NOT NULL;


ALTER TABLE usuario ADD COLUMN correo_persona VARCHAR(100) NOT NULL DEFAULT 'sincorreo@correo.com';

SELECT *  FROM queja


INSERT INTO rol_usuario (nombre_rol) VALUES ('Administrador');


DROP TABLE rolusuario;