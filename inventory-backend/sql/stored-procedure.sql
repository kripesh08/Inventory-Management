DELIMITER $$

CREATE PROCEDURE update_product_status(IN p_product_id INT)
BEGIN 

	DECLARE v_quantity INT;
    DECLARE v_reorder_level INT;
    DECLARE v_product_status VARCHAR(20);
    
    SELECT quantity, reorder_level, product_status
    INTO v_quantity, v_reorder_level, v_product_status
    FROM product
    WHERE product_id = p_product_id;

	IF v_quantity <= v_reorder_level AND v_product_status != 'Stock Placed' THEN
		
        UPDATE product
        SET	product_status = 'Stock Placed', updated_at = CURRENT_TIMESTAMP
        WHERE product_id = p_product_id;
        
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
            v_reorder_level,
            v_reorder_level * (SELECT price FROM product WHERE product_id = p_product_id),
            p_product_id,
            (SELECT supplier_id FROM product WHERE product_id = p_product_id),
            CURRENT_TIMESTAMP
        );
	END IF;
END$$

DELIMITER ;