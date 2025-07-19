import axios from "axios";
import { useEffect, useRef, useState } from "react";

const StockOrder = () => {

    const [stock, setStock] = useState([]);
    const [status, setStatus] = useState("Delivered");
    const [error, setError] = useState(null);
    const penref = useRef();
    // Fetch products, categories, and suppliers
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const stockResponse = await axios.get('http://localhost:5000/stock-orders');
            setStock(stockResponse.data);
            console.log(stockResponse.data);
        } catch (error) {
            setError('Error fetching data');
        }
    };

    const handleSelectChange = (order_id) => {
        // const flag = window.confirm("Are you sure ?");
        // if (flag) {
        alert(order_id)
        try {
            console.log(status);
            const response = axios.put(`http://localhost:5000/stock-orders/${order_id}`, { status: status });
            if (response) {
                alert("Updated Successfully");
            } else {
                console.log("Error in updating Stock");
            }
            alert("Delivered!")
            fetchData();
        } catch (error) {
            console.log(error);
        }
        // } else {
        // alert("No");
        // console.log(penref.current);
        // }

    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        < div >
            <h1>Stock Orders</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Product Name</th>
                        <th>Supplier Name</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stock) => (
                        <tr key={stock.order_id}>
                            <td>{stock.order_id}</td>
                            <td>{stock.order_date.split('T')[0].split('-').reverse().join("-")}</td>
                            <td>
                                {
                                    stock.order_status === 'Pending' ?
                                        <select onChange={() => {
                                            handleSelectChange(stock.order_id)
                                        }}>
                                            <option ref={penref} value={stock.order_status}>{stock.order_status}</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                        :
                                        'Delivered'
                                }

                            </td>
                            <td>{stock.quantity}</td>
                            <td>{stock.total_price}</td>
                            <td>{stock.product_name}</td>
                            <td>{stock.supplier_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default StockOrder;