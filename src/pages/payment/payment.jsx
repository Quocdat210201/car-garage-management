import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./paymentPage";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51ObKGxJRGClQXLNL3aB9RhltKs0W0bPsg4suojeWDcpd7nryPl8Z0QtvuuvmqG7MUsZbiJ9qJRfshx0StW1OFH0l009WSsgsqW"
      )
    );
    // fetch("/config").then(async (r) => {
    //   const { publishableKey } = await r.json();
    //   setStripePromise(loadStripe(publishableKey));
    // });
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const result = await fetch("/create-payment-intent", {
          method: "POST",
          body: JSON.stringify({}),
        });

        if (!result.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };
    createPaymentIntent();
  }, []);

  return (
    <>
      <h1>Thanh toán</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
