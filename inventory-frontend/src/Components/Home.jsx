import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [customerCount, setCustomerCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [saleCount, setSaleCount] = useState(0);
    const [supplierCount, setSupplierCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [lowStockItems, setLowStockItems] = useState([]);

    const fetchProductCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-product');
            setProductCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCustomerCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-customer');
            setCustomerCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSupplierCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-supplier');
            setSupplierCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSaleCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-sale');
            setSaleCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategoryCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-category');
            setCategoryCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStockCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-stock');
            setDeliveredCount(response.data[0].count);
            setPendingCount(response.data[1].count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLowStockItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/low-stock');
            setLowStockItems(response.data);
        } catch (error) {
            console.log("Low stock fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProductCount();
        fetchCustomerCount();
        fetchSupplierCount();
        fetchCategoryCount();
        fetchSaleCount();
        fetchStockCount();
        fetchLowStockItems();
    }, []);

    return (
        <div>
            <h1>Dashboard Overview</h1>

            {/* 🔔 Low Stock Notification */}
            {lowStockItems.length > 0 && (
                <div style={{
                    backgroundColor: "#fff3cd",
                    border: "1px solid #ffeeba",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    color: "#856404"
                }}>
                    <strong>⚠️ Low Stock Alert:</strong>
                    <ul>
                        {lowStockItems.map(item => (
                            <li key={item.product_id}>
                                {item.name} - Quantity: {item.quantity}, Reorder Level: {item.reorder_level}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="status-cards">
                <div className="status-card">
                    <h3>Products</h3>
                    <p>Total: {productCount}</p>
                </div>
                <div className="status-card">
                    <h3>Categories</h3>
                    <p>Total: {categoryCount}</p>
                </div>
                <div className="status-card">
                    <h3>Suppliers</h3>
                    <p>Total: {supplierCount}</p>
                </div>
                <div className="status-card">
                    <h3>Stock Orders</h3>
                    <p>Pending: {pendingCount}</p>
                    <p>Delivered: {deliveredCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
