import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const cartItems= JSON.parse(localStorage.getItem("formattedCart"));
 

  const userdata = JSON.parse(localStorage.getItem("userdata"));

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const session_id = query.get("session_id");

    if (!session_id) {
      alert("No session id found");
      navigate("/");
      return;
    }

   
    const saveOrder = async () => {
      try {
        await axios.post("http://localhost:8000/save-order", {
          session_id,
          userdata,
          cartItems,
          totalAmount,
        });

        alert("Order saved successfully");
        
        localStorage.removeItem("userdata");
      
        navigate("/");
        localStorage.removeItem("formattedCart");
      } catch (error) {
        alert("Failed to save order: " + error.message);
      }
    };

    saveOrder();
  }, [location, navigate, cartItems, userdata, totalAmount]);

  return (
    <div className="container mt-5">
      <h2 style={{color:"green"}}>Payment Success!</h2>   
         <p>Thank you </p>
    </div>
  );
};

export default SuccessPage;
