const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
var cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kichu@123",
  database: "inventory",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database");
});

// server running here
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// API routes

// get count-stock
app.get("/count-stock", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS count, order_status FROM stock_order GROUP BY order_status;",
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
});

// get count-product
app.get("/count-product", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM product;", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// get count-customer
app.get("/count-customer", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM customer;", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// get count-category
app.get("/count-category", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM category;", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// get count-supplier
app.get("/count-supplier", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM supplier;", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// get count-supplier
app.get("/count-sale", (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM sale;", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Get all categories
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM category ORDER BY category_id", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Add a new category
app.post("/categories", (req, res) => {
  const { category_name } = req.body;
  db.query(
    "INSERT INTO category (category_name) VALUES (?)",
    [category_name],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Category added", category_id: results.insertId });
      }
    }
  );
});

// Get all suppliers
app.get("/suppliers", (req, res) => {
  db.query("SELECT * FROM supplier ORDER BY supplier_id", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Add a new supplier
app.post("/suppliers", (req, res) => {
  const { supplier_name, email, phone_no } = req.body;
  db.query(
    "INSERT INTO supplier (supplier_name, email, phone_no) VALUES (?, ?, ?)",
    [supplier_name, email, phone_no],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Supplier added", supplier_id: results.insertId });
      }
    }
  );
});

// Get all stock orders
app.get("/stock-orders", (req, res) => {
  db.query(
    "SELECT order_id, order_date, order_status, stock_order.quantity, stock_order.total_price, product_name, supplier_name FROM stock_order INNER JOIN product ON stock_order.product_id = product.product_id INNER JOIN supplier ON stock_order.supplier_id = supplier.supplier_id;",
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
});

// Update stock order
app.put("/stock-orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(id);
  console.log(req.body);
  db.query(
    "UPDATE stock_order SET order_status = ? WHERE order_id = ?;",
    ["Delivered", id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Stock updated", order_id: id });
      }
    }
  );
});

// Get all customers
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customer", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Add a new customer
app.post("/customers", (req, res) => {
  const { customer_name, email, phone_no } = req.body;
  db.query(
    "INSERT INTO customer (customer_name, email, phone_no) VALUES (?, ?, ?)",
    [customer_name, email, phone_no],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Customer added", customer_id: results.insertId });
      }
    }
  );
});

// Get all sales
app.get("/sales", (req, res) => {
  db.query("SELECT * FROM sale", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Add a new sale and sale items
app.post("/sales", (req, res) => {
  const { payment_type, total_price, customer_id, sale_items } = req.body; // sale_items: array of { product_id, quantity, sub_total }
  db.query(
    "INSERT INTO sale (payment_type, total_price, customer_id) VALUES (?, ?, ?)",
    [payment_type, total_price, customer_id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const sale_id = results.insertId;
        const saleItemQueries = sale_items.map((item) => [
          item.quantity,
          item.sub_total,
          item.product_id,
          sale_id,
        ]);
        db.query(
          "INSERT INTO sale_item (quantity, sub_total, product_id, sale_id) VALUES ?",
          [saleItemQueries],
          (itemErr) => {
            if (itemErr) {
              res.status(500).json({ error: itemErr.message });
            } else {
              res.json({ message: "Sale and sale items added", sale_id });
            }
          }
        );
      }
    }
  );
});

// Get all sale items
app.get("/sale-items/:sale_id", (req, res) => {
  const saleId = req.params.sale_id; // Get the sale_id parameter from the URL
  db.query(
    "SELECT * FROM sale_item WHERE sale_id = ?",
    [saleId],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res
          .status(404)
          .json({ error: "No sale item found with the given sale_id" });
      } else {
        res.json(results);
      }
    }
  );
});

// Get all products
app.get("/products", (req, res) => {
  db.query(
    "SELECT product.product_id, product_name, unit_type, reorder_level, quantity, price, product_status, category.category_name, supplier.supplier_name FROM	product INNER JOIN product_log ON product.product_id = product_log.product_id " +
      "INNER JOIN category ON product.category_id = category.category_id " +
      "INNER JOIN	supplier ON product.supplier_id = supplier.supplier_id ORDER BY product.product_id;",
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    }
  );
});

// Add a new product and create a log
app.post("/products", (req, res) => {
  const {
    product_name,
    product_description,
    unit_type,
    price,
    reorder_level,
    category_id,
    supplier_id,
  } = req.body;

  console.log(price);

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: "Error starting transaction" });
    }

    // Insert the product
    db.query(
      "INSERT INTO product (product_name, product_description, unit_type, price, reorder_level, quantity, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        product_name,
        product_description,
        unit_type,
        price,
        reorder_level,
        0,
        category_id,
        supplier_id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);

          // If product insertion fails, rollback the transaction
          return db.rollback(() => {
            res.status(500).json({ error: "Error inserting product" });
          });
        }

        const product_id = results.insertId;
        console.log(results);

        console.log(product_id);

        // Insert the product log
        db.query(
          "INSERT INTO product_log (product_id, product_status) VALUES (?, ?)",
          [product_id, "Stock Placed"],
          (err) => {
            if (err) {
              // If log insertion fails, rollback the transaction
              return db.rollback(() => {
                res.status(500).json({ error: "Error inserting product log" });
              });
            }

            // Commit the transaction if both queries succeed
            db.commit((err) => {
              if (err) {
                // If commit fails, rollback the transaction
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ error: "Error committing transaction" });
                });
              }

              // Send a response if everything is successful
              res.json({
                message: "Product added and log created",
                product_id,
              });
            });
          }
        );
      }
    );
  });
});
