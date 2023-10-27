import axios from 'axios';
import React from 'react'

function DeleteBtn(props) {

    const {
      ordersList,
      setOrdersList,
      pizza,
    } = props;



  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/api/orders/" + pizza._id)

      .catch((err) => console.log(err));

    const neworders = ordersList.filter((ord) => ord._id !== pizza._id);

    setOrdersList(neworders);
    
  };
  return (
    <div>
      <button className="delete_btn" onClick={handleDelete}>
        Remove
      </button>
    </div>
  );
}

export default DeleteBtn