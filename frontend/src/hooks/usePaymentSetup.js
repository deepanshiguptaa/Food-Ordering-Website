import { useState, useEffect } from 'react';

// Replace with your actual backend URL
const PAYMENT_INTENT_URL = "http://localhost:5000/api/create-payment-intent"; 

export const usePaymentSetup = (amount, currency) => {
    const [clientSecret, setClientSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch(PAYMENT_INTENT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // Pass the necessary transaction details to your backend
                    body: JSON.stringify({ amount, currency }), 
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                if (!data.clientSecret) {
                    throw new Error("Backend did not return a clientSecret.");
                }
                
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error("Payment setup failed:", err);
                setError(err.message || "Failed to initialize payment.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientSecret();
    }, [amount, currency]); // Dependencies ensure it refetches if payment details change

    return { clientSecret, isLoading, error };
};