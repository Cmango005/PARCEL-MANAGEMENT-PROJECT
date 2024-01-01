import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)
const Payment = () => {
    const parcel = useLoaderData();
    console.log(parcel);
    return (
        <div>
            
            <div>
                <Elements stripe={stripePromise}>
                    <Checkout parcel={parcel}></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
