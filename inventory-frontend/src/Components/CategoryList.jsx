import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        category_name: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                setCategories(response.data);
            } catch (error) {
                setError('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCategory = async () => {
        try {
            await axios.post('http://localhost:5000/categories', newCategory);
            setModalOpen(false);
            setNewCategory({ category_name: '', });
            alert("Added Category");
            // Re-fetch the suppliers to reflect the newly added one
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            setError('Error adding new category');
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Categories</h1>
            <button className="btn btn-primary" onClick={openModal}>Add Category</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Category Id</th>
                        <th>Category Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.category_id}>
                            <td>{category.category_id}</td>
                            <td>{category.category_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for adding a new supplier */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Supplier</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
                            <label>
                                Category Name:
                                <input
                                    type="text"
                                    name="category_name"
                                    value={newCategory.category_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Add Category</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
