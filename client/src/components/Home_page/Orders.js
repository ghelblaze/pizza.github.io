import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteBtn from "./DeleteBtn"
import { useNavigate } from 'react-router-dom';
import './Orders.css'

const Orders = () => {

  const [ordersList, setOrdersList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate()

  const fetchData = async () =>{
     await axios
       .get("http://localhost:8000/api/orderslist")
       .then((res) => {
         setOrdersList(...ordersList, res.data.orders);
         console.log(res.data.orders);
       })
       .catch((err) => console.log(err));
  }

  useEffect(() => {
   
    fetchData()
      
  }, []);

  const handleDelivered = async (pizza) => {
    // Toggle the checkbox locally
    setIsChecked(!isChecked);

    try {
      // Send a PUT request to toggle the boolean field in MongoDB
      await axios.put(
        "http://localhost:8000/api/updateDeliveryStatus/" + pizza._id
      );

      // Send a GET request to retrieve the updated value
      const response = await axios.get(
        `http://localhost:8000/api/value/` + pizza._id
      );
      setIsChecked(response.data.value);
      console.log(isChecked)
    } catch (error) {
      console.error(error);
    }
  };
   
  const hideDelivered = ()=>{
    const hide = ordersList.filter(item => !item.checkDelivery)
    setOrdersList(hide)
  }
  const showDelivered = () => {
    const showAll = ordersList.filter((item) => item.checkDelivery);
    setOrdersList(showAll);
    
  };
  

  return (
    <div className="order_container">
      <nav className="order_nav">
        <div className="order_nav_top">
          <h1 className="order_title">Pizza Orders</h1>
          <button
            className="order_btn"
            onClick={() => navigate("/select_pizza")}
          >
            Order a Pizza
          </button>
        </div>
        <div className="order_nav_bottom">
          <button className="order_btn" onClick={hideDelivered}>
            Hide Delivered orders
          </button>
          <button className="order_btn" onClick={showDelivered}>
            Show Delivered orders
          </button>
          
        </div>
      </nav>
      *{" "}
      <div className="order_list_body">
        <table>
          <thead>
            <tr>
              <th>Delivery time</th>
              <th>Pizzas</th>
              <th>Size</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((pizza, idx) => {
              return (
                <tr className="pizza_row" key={idx}>
                  <td>{new Date(pizza.date).toLocaleString()}</td>
                  <td>{pizza.type}</td>
                  <td>{pizza.size}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={pizza.checkDelivery}
                      onChange={() => handleDelivered(pizza)}
                    ></input>
                  </td>
                  <td>
                    <DeleteBtn
                      ordersList={ordersList}
                      setOrdersList={setOrdersList}
                      pizza={pizza}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders