import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        supplier_name: '',
        email: '',
        phone_no: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                setError('Error fetching suppliers');
            }
        };

        fetchSuppliers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSupplier = async () => {
        try {
            await axios.post('http://localhost:5000/suppliers', newSupplier);
            setModalOpen(false);
            setNewSupplier({ supplier_name: '', email: '', phone_no: '' });
            // Re-fetch the suppliers to reflect the newly added one
            const response = await axios.get('http://localhost:5000/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            setError('Error adding new supplier');
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Suppliers</h1>
            <button className="btn btn-primary" onClick={openModal}>Add Supplier</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Supplier Id</th>
                        <th>Supplier Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.supplier_id}>
                            <td>{supplier.supplier_id}</td>
                            <td>{supplier.supplier_name}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.phone_no}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for adding a new supplier */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Supplier</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddSupplier(); }}>
                            <label>
                                Supplier Name:
                                <input
                                    type="text"
                                    name="supplier_name"
                                    value={newSupplier.supplier_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={newSupplier.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Phone No:
                                <input
                                    type="text"
                                    name="phone_no"
                                    value={newSupplier.phone_no}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Add Supplier</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierList;
