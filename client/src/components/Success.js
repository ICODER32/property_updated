import React, { useEffect } from 'react';

const PaymentSuccessful = () => {
    useEffect(() => {
        setTimeout(() => {
            window.location.assign('/')
        }, 5000);
    }, [])
    return (
        <div className="success-message">
            Payment successful!
        </div>
    );
};

export default PaymentSuccessful;
