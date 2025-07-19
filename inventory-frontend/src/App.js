import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import CategoryList from "./Components/CategoryList";
import SupplierList from "./Components/SupplierList";
import ProductList from "./Components/ProductList";
import SaleList from "./Components/SaleList";
import CustomerList from "./Components/CustomerList";
import StockOrder from "./Components/StockOrder";

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h2>Inventory</h2>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/suppliers">Suppliers</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/stock-orders">Stock Orders</Link>
            </li>
            {/* <li>
              <Link to="/customers">Customers</Link>
            </li>{" "} */}
            {/* <li>
              <Link to="/sales">Sales</Link>
            </li> */}
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/stock-orders" element={<StockOrder />} />
            <Route path="/sales" element={<SaleList />} />
            <Route path="/customers" element={<CustomerList />} />{" "}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
