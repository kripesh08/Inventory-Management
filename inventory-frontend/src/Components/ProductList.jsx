import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_description: '',
        unit_type: '',
        category_id: '',
        supplier_id: '',
        price: '',
        quantity: '',
        reorder_level: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products, categories, and suppliers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get('http://localhost:5000/products');
                setProducts(productResponse.data);

                const categoryResponse = await axios.get('http://localhost:5000/categories');
                setCategories(categoryResponse.data);

                const supplierResponse = await axios.get('http://localhost:5000/suppliers');
                setSuppliers(supplierResponse.data);
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = async () => {
        try {
            await axios.post('http://localhost:5000/products', newProduct);
            setModalOpen(false);
            setNewProduct({
                product_name: '',
                product_description: '',
                unit_type: '',
                price: '',
                reorder_level: '',
                category_id: '',
                supplier_id: '',
            });
            // Re-fetch the products to reflect the newly added one
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            setError('Error adding new product');
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Products</h1>
            <button className="btn btn-primary" onClick={openModal}>Add Product</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Unit Type</th>
                        <th>Quantity</th>
                        <th>Reorder Level</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Supplier</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.unit_type}</td>
                            <td>{product.quantity}</td>
                            <td>{product.reorder_level}</td>
                            <td>{product.price}</td>
                            <td>{product.product_status}</td>
                            <td>{product.category_name}</td>
                            <td>{product.supplier_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for adding a new product */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Product</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    name="product_name"
                                    value={newProduct.product_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Product Description:
                                <input
                                    type="text"
                                    name="product_description"
                                    value={newProduct.product_description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Unit type:
                                <select
                                    name="unit_type"
                                    value={newProduct.unit_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Unit Type</option>
                                    <option value="pcs">pcs</option>
                                    <option value="box">box</option>
                                    <option value="kg">kg</option>
                                    <option value="liters">liters</option>
                                </select>
                            </label>
                            <br />
                            <label>
                                Category:
                                <select
                                    name="category_id"
                                    value={newProduct.category_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.category_id} value={category.category_id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Supplier:
                                <select
                                    name="supplier_id"
                                    value={newProduct.supplier_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.supplier_id} value={supplier.supplier_id}>
                                            {supplier.supplier_name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            {/* <label>
                                Stock Quantity:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={newProduct.quantity}
                                    onChange={handleInputChange}
                                    min={1}
                                    required
                                />
                            </label> */}
                            <label>
                                Reorder Level:
                                <input
                                    type="number"
                                    name="reorder_level"
                                    value={newProduct.reorder_level}
                                    onChange={handleInputChange}
                                    min={1}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Add Product</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
