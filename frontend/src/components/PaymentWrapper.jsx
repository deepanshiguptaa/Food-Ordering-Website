// src/components/PaymentWrapper.jsx
import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { usePaymentSetup } from '../hooks/usePaymentSetup';

// 🛑 UPDATE THIS: Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY"); 

// ASSUMPTION: You pass the necessary order total here
const PaymentWrapper = ({ orderTotal }) => {
    // 1. Use the custom hook to fetch the secret
    // Note: orderTotal is likely in CENTS for Stripe, e.g., $10.00 is 1000
    const { clientSecret, isLoading, error } = usePaymentSetup(orderTotal, 'usd'); 

    if (isLoading) {
        return <div className="payment-loading">Initializing payment...</div>; 
    }

    if (error) {
        // This means your backend failed or the API call failed. Fix your backend first.
        return <div className="payment-error">Error: {error}. Cannot proceed with payment.</div>; 
    }
    
    // 2. Define options when clientSecret is ready
    const options = { 
        clientSecret,
        // You can add appearance options here later
    };

    // 3. Render the Elements wrapper conditionally
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentWrapper;