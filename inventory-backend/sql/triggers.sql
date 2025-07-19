-- Trigger for adding a new record in stock order when the quantity reaches reorder_level
DELIMITER $$

CREATE TRIGGER trg_product_reorder
AFTER UPDATE ON product
FOR EACH ROW
BEGIN
	IF NEW.quantity <= NEW.reorder_level AND (SELECT product_status FROM product_log WHERE product_id = NEW.product_id) != 'Stock Placed' THEN
		INSERT INTO stock_order(
			order_date,
			order_status,
			quantity,
			total_price,
			product_id,
			supplier_id,
			updated_at
		) VALUES(
			CURRENT_TIMESTAMP,
			'Pending',
			NEW.reorder_level * 2,
			(NEW.reorder_level * 2 ) * NEW.price,
			NEW.product_id,
			NEW.supplier_id,
			CURRENT_TIMESTAMP
		);
        
        UPDATE product_log
        SET product_status = 'Stock Placed'
        WHERE product_id = NEW.product_id;
    END IF;
END$$

DELIMITER ;

-- Trigger for updating the status pending to delivered
DELIMITER $$

CREATE TRIGGER trg_stock_status_delivered
AFTER UPDATE ON stock_order
FOR EACH ROW
BEGIN
	-- check if the stock_order status is updated to Delivered
    IF NEW.order_status = 'Delivered' THEN
    
		-- update the product quantity 
        UPDATE product
        SET quantity = quantity + NEW.quantity
        WHERE product_id = NEW.product_id;
        
        -- update the product status as In Stock
		UPDATE product_log
        SET product_status = 'In Stock'
        WHERE product_id = NEW.product_id;
	END IF;
END$$

DELIMITER ;

-- for inserting the data in product 
DELIMITER $$

CREATE TRIGGER trg_product_reorder_insert
AFTER INSERT ON product
FOR EACH ROW
BEGIN
	IF NEW.quantity <= NEW.reorder_level AND (SELECT product_status FROM product_log WHERE product_id = NEW.product_id) != 'Stock Placed' THEN
		INSERT INTO stock_order(
			order_date,
			order_status,
			quantity,
			total_price,
			product_id,
			supplier_id,
			updated_at
		) VALUES(
			CURRENT_TIMESTAMP,
			'Pending',
			NEW.reorder_level * 2,
			(NEW.reorder_level * 2 ) * NEW.price,
			NEW.product_id,
			NEW.supplier_id,
			CURRENT_TIMESTAMP
		);
        
        UPDATE product_log
        SET product_status = 'Stock Placed'
        WHERE product_id = NEW.product_id;
    END IF;
END$$

DELIMITER ;

-- product log after inserting a new product

DELIMITER $$

CREATE TRIGGER trg_product_log_insert
AFTER INSERT ON product_log
FOR EACH ROW
BEGIN
	IF ((SELECT quantity FROM product WHERE product_id = NEW.product_id) <= (SELECT reorder_level FROM product WHERE product_id = NEW.product_id)) AND NEW.product_status != 'Stock Placed' THEN
		INSERT INTO stock_order(
			order_date,
			order_status,
			quantity,
			total_price,
			product_id,
			supplier_id,
			updated_at
		) VALUES(
			CURRENT_TIMESTAMP,
			'Pending',
			(SELECT reorder_level FROM product WHERE product_id = NEW.product_id) * 2,
			((SELECT reorder_level FROM product WHERE product_id = NEW.product_id) * 2) * (SELECT price FROM product WHERE product_id = NEW.product_id),
			NEW.product_id,
			(SELECT supplier_id FROM product WHERE product_id = NEW.product_id),
			CURRENT_TIMESTAMP
		);
    END IF;
END$$

DELIMITER ;