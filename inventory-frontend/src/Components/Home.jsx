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

    const fetchProductCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-product');
            console.log(response.data[0].count);
            setProductCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCustomerCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-customer');
            console.log(response.data[0].count);
            setCustomerCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSupplierCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-supplier');
            console.log(response.data[0].count);
            setSupplierCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSaleCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-sale');
            console.log(response.data[0].count);
            setSaleCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategoryCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-category');
            console.log(response.data[0].count);
            setCategoryCount(response.data[0].count);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStockCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/count-stock');
            console.log(response.data[0].count);
            setDeliveredCount(response.data[0].count);
            setPendingCount(response.data[1].count);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchProductCount()
        fetchCustomerCount()
        fetchSupplierCount()
        fetchCategoryCount()
        fetchSaleCount()
        fetchStockCount()
    }, [])

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <div className="status-cards">
                {/* <div className="status-card">
                    <h3>Customers</h3>
                    <p>Total: {customerCount}</p>
                </div> */}
                <div className="status-card">
                    <h3>Products</h3>
                    <p>Total: {productCount}</p>
                </div>
                <div className="status-card">
                    <h3>Categories</h3>
                    <p>Total: {categoryCount}</p>
                </div>
                {/* <div className="status-card">
                    <h3>Sales</h3>
                    <p>Total: {saleCount}</p>
                </div> */}
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
