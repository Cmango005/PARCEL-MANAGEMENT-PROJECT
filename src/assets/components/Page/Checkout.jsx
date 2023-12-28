import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { MdOutlinePayment } from "react-icons/md";


const Checkout = ({selectedPayParcel}) => {
   // console.log(selectedParcel);
    const stripe = useStripe();
    const elements =useElements();
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (selectedPayParcel && selectedPayParcel.price) {
            fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: parseInt(selectedPayParcel.price) }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [selectedPayParcel]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || elements){
            return
        }
        const card = elements.getElement(CardElement);
        if(card == null){
          return;
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if(error){
            console.log("Payment Error", error)
        }else{
            console.log("Payment Method", paymentMethod)
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret} className="flex flex-row items-center btn btn-success mt-5">
                Pay<MdOutlinePayment className="ml-4" />
            </button>
        </form>
    );
};

export default Checkout;