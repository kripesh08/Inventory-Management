-- alter command for product table
ALTER TABLE product
ADD CHECK(price > 0 AND quantity >= 0);

ALTER TABLE product
MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE product
MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE product
DROP COLUMN product_status ,
DROP COLUMN updated_at;

-- alter command for sale_item table
ALTER TABLE sale_item
ADD CHECK(sub_total > 0 AND quantity > 0);

-- alter command for supplier
ALTER TABLE supplier
MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE supplier
MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- alter command for stock order table
ALTER TABLE stock_order
ADD CHECK(total_price > 0 AND quantity >= 0);

ALTER TABLE stock_order
MODIFY order_date TIMESTAMP NOT NULL;

ALTER TABLE stock_order
MODIFY order_status ENUM('Pending', 'Delivered') NOT NULL;

ALTER TABLE stock_order
MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;

