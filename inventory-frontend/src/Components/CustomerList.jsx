import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        customer_name: '',
        email: '',
        phone_no: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customers'); // Replace with your actual API endpoint
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCustomer = async () => {
        try {
            await axios.post('http://localhost:5000/customers', newCustomer);
            setModalOpen(false);
            setNewCustomer({ supplier_name: '', email: '', phone_no: '' });
            alert("Customer Added Successfully");
            // Re-fetch the suppliers to reflect the newly added one
            const response = await axios.get('http://localhost:5000/customers');
            setCustomers(response.data);
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
        <section>
            <h1>Customer List</h1>
            <button className="btn btn-primary" onClick={openModal}>Add Customer</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.customer_id}>
                            <td>{customer.customer_id}</td>
                            <td>{customer.customer_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone_no}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for adding a new supplier */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Supplier</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddCustomer(); }}>
                            <label>
                                Customer Name:
                                <input
                                    type="text"
                                    name="customer_name"
                                    value={newCustomer.customer_name}
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
                                    value={newCustomer.email}
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
                                    value={newCustomer.phone_no}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Add Customer</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CustomerList;
