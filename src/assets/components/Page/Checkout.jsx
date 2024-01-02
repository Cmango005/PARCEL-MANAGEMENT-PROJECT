import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { MdOutlinePayment } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const Checkout = ({ parcel }) => {
    // console.log(selectedParcel);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [isPaid, setPaid] = useState(false)
    const [transaction, setTransaction] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch('https://parcel-management-server-steel.vercel.app/order')
            .then(res => res.json())
            .then(data => setAllOrder(data))
    }, [allOrder])
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (parcel && parcel.price) {
            fetch("https://parcel-management-server-steel.vercel.app/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: parseInt(parcel.price) }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [parcel]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaid(true)
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log("Payment Error", error)
        } else {
            console.log("Payment Method", paymentMethod)
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })
        if (confirmError) {
            console.log("confirmError");
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("Your Transaction ID:", paymentIntent.id);
                setTransaction(paymentIntent.id);
                console.log(parcel._id);
                const deliveryMan = parcel.deliveryMan;
                const deliveryDate = parcel.deliveryDate;
                fetch(`https://parcel-management-server-steel.vercel.app/order/${parcel._id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ status: "paid", deliveryMan, deliveryDate })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            const remaining = allOrder.filter(order => order._id !== parcel._id);
                            const updated = allOrder.find(order => order._id === parcel._id);
                            updated.status = 'paid';
                            updated.deliverMan = parcel.deliveryMan;
                            updated.deliveryDate = parcel.deliveryDate;
                            const newOrder = [updated, ...remaining];
                            setAllOrder(newOrder)
                            toast.success('Successfully Paid');
                        }
                    });
            }
        }
    }
    return (
        <div className="p-10 space-y-10">
            <p className="text-center text-2xl font-bold">Please Pay Your Bill</p>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#fff',
                                '::placeholder': {
                                    color: '#fff',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || isPaid} className={`flex flex-row items-center btn btn-success mt-5 px-4 py-2 rounded ${isPaid ? 'cursor-not-allowed opacity-50' : ''}`} >
                    Pay<MdOutlinePayment className="ml-4" />
                </button>
                <ToastContainer></ToastContainer>
                {transaction && <p className="text-red-500 ">Your TransactionID:{transaction}</p>}
            </form>
        </div>
    );
};
Checkout.propTypes = {
    parcel: PropTypes.object
}
export default Checkout;



