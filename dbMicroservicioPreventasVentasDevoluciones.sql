CREATE DATABASE microservicioPreventasVentasDevoluciones;
USE microservicioPreventasVentasDevoluciones;

CREATE TABLE preventas(
		id_preventa INT AUTO_INCREMENT PRIMARY KEY,
		id_cliente INT NOT NULL,
		id_colaborador INT NOT NULL,
		fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_confirmacion TIMESTAMP NULL,
		estado ENUM('Pendiente', 'Confirmada', 'Cancelada') DEFAULT 'Pendiente',
		total DECIMAL(10,2) DEFAULT 0
);
SELECT * FROM preventas;

CREATE TABLE detalle_preventa(
	id_detalle INT AUTO_INCREMENT PRIMARY KEY,
	id_preventa INT NOT NULL,
	id_producto INT NOT NULL,
	cantidad INT NOT NULL,
	subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    estado ENUM('vendido', 'devuelto') DEFAULT 'vendido',
    fecha_confirmacion TIMESTAMP NULL,
	FOREIGN KEY (id_preventa) REFERENCES preventas(id_preventa)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

SELECT * FROM detalle_preventa;
