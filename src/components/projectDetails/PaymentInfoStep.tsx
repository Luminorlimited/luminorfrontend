import React from "react";
import PaymentForm from "./PaymentForm";
import TransactionTable from "./TransactionTable";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


export interface PaymentInfoStepProps {
    getSingleOffer: string | any; // Define the appropriate type for your function
    requirementdata: any
}

const PaymentInfoStep: React.FC<PaymentInfoStepProps> = ({ getSingleOffer, requirementdata }) => {
    const stripePromise = loadStripe("pk_test_51QVuODAk94MRg2rW7rB7N7jPqZOF0PCch4lW0N2u8WyVp0agsTuEdzMQhBZa95Wb5FYRyr3wHnZYkiylgq2bLJxC00E6nrPgYn")
    return (
        <div>
            <Elements stripe={stripePromise}>

                <PaymentForm requirementdata={requirementdata} getSingleOffer={getSingleOffer} />
            </Elements>
            <TransactionTable />
        </div>
    );
};

export default PaymentInfoStep;
