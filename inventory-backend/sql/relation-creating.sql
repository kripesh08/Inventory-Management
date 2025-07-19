create table category(
	category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

create table supplier(
	supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_no VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table product(
	product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) UNIQUE NOT NULL,
    product_description VARCHAR(255),
    unit_type ENUM('pcs', 'box', 'kg', 'liters') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    reorder_level INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);

create table product_log(
	product_log_id INT AUTO_INCREMENT PRIMARY KEY,
    product_status ENUM('In Stock', 'Stock Placed', 'Out Of Stock') NOT NULL, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

create table stock_order(
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status ENUM('Pending', 'Delivered'),
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    supplier_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);

create table customer(
	customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_no VARCHAR(255) NOT NULL
);

create table sale(
	sale_id INT AUTO_INCREMENT PRIMARY KEY,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    payment_type ENUM('Cash', 'UPI Payment', 'Card') NOT NULL, 
    total_price DECIMAL(10, 2) NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
);

create table sale_item(
	sale_item_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    sub_total DECIMAL(10, 2) NOT NULL,
    product_id INT NOT NULL,
    sale_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(product_id),
    FOREIGN KEY(sale_id) REFERENCES sale(sale_id)
);


desc product;
desc customer;