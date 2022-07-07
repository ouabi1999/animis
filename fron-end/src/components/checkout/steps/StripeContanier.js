import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";
import Billing from "./Billing";
import { FormContext } from "../CheckoutContainer";
import Skeleton from "../Skeleton";
import SkeletonLoader from "../Skeleton";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LH58oGw1CxnQh9eQ8lKmbZx0yO348wmVYEaYG1Bv0nLBgEK5HW70EziLV1gYmD5gBdQJhpoYIhSJeNDZbzaJfBb00eSX4p2hX");

export default function StripeContanier() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userId: formData.userId,
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
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'night',
    labels: 'floating'
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (

    <Container>
    {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
    ):
    <div><SkeletonLoader/></div>
  }
   <button onClick={()=> setActiveStepIndex(activeStepIndex - 1 )}>Back</button>
    </Container>
  )
  
}
const Container = styled.div`

 margin-top:50px;
 


`