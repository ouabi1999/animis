import { useState, useEffect, useContext } from "react";
import React from 'react'
import { FormContext } from "./CheckoutContainer";


function SuccessfulOrder() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);
  const [order, setOrder] = useState({})

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        city: formData.city,
        address1: formData.address1,
        address2: formData.address2,
        zip: formData.zip,
        state: formData.state,
        country: formData.country,
        shippingMethod: formData.shippingMethod,
        shippingPrice: formData.shippingPrice,
        totalPrice: formData.totalPrice

      }),
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  return (
    <div>
      <div>SuccessfulOrder</div>
  
        {order?.address1}
      
    </div>
  )
}

export default SuccessfulOrder