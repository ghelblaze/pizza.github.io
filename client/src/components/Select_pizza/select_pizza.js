import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './select_pizza.css'

const Select_pizza = ({ deliveriesNumber, setDeliveriesNumber }) => {
  const [type, setType] = useState("pepperoni");
  const [size, setSize] = useState("small");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [errorValidation, setErrorValidation] = useState(false)
  const navigate = useNavigate();

  const orderHandler = (e) => {
    const checkDelivery = false
    e.preventDefault();
    if(!type | !size | !date){
      setErrorValidation(true);
     
    }
    else{
      axios
        .post("http://localhost:8000/api/addOrder", {
          type,
          size,
          notes,
          date,
          checkDelivery,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate('/')
        })
        .catch((err) => console.log(err));
    }
    
  };
  return (
    <div className="select_container">
      <nav className="select_nav">
        <h1 className="select_title">Make your choice!</h1>
        <button className="back_home_btn" onClick={() => navigate("/")}>
          Orders List
        </button>
      </nav>
      <div className="select_body">
        <form className="select_form ">
          <div className="form_top">
            <div>
              <label htmlFor="pizzaType">Choose your Taste*:  </label>
              <select
                name="pizzaType"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                required
              >
                <option value="pepperoni">Pepperoni</option>
                <option value="cheese">Cheese</option>
                <option value="combination">Combination</option>
                <option value="philly">Philly Cheese Steack</option>
                <option value="hawaiian">Hawaiian</option>
                <option value="veggie">Veggie</option>
              </select>
            </div>
            <div>
              <label htmlFor="pizzaSize">How Big 🍕*:  </label>
              <select
                name="pizzaSize"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                required
              >
                <option value="single">Single</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="notesInput" className='notes_label'>Any other choices??:</label>
            <textarea
              name="notesInput"
              value={notes}
              placeholder="Add your tastes here, max 25 characters"
              rows="4"
              cols="50"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></textarea>
            {notes.length > 25 ? (
              <p className="alert">Notes must be maximum 25 characters</p>
            ) : null}
          </div>
          <div className='timer'>
            <label htmlFor="deliveryDate"className='time_title'>At what time??🕥*  </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            {deliveriesNumber === 10 ? (
              <p className="alert">max 10 deliveries, try later!</p>
            ) : null}
          </div>

          <button className="back_home_btn" onClick={orderHandler}>
            Confirm Order! 🤤{" "}
          </button>
          {errorValidation ? (
            <p className="alert">Marked fields (*) are mendatory</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Select_pizza