import { loadStripe } from '@stripe/stripe-js';
import './PaymentPage.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function PaymentPage() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    setLoading(true);
    const stripe = await loadStripe('pk_test_51Rh33KERalJTiWg57ZlFE9ICap0d3MT5I2SwdxE7epKunYyuNZBWMI1eH2z4iJGXoZ2nXkF8YY9Dmdi6wCj3hgzE00s5jVbwrM');

    if (!state || !state.pricePerNight || !state.name || !state.location) {
      alert('Missing hotel information');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8088/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: state.pricePerNight * state.selectedRooms * 100,
          hotelName: state.name,
          location: state.location,
          selectedRooms: state.selectedRooms,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Stripe checkout session.');
      }

      const session = await response.json();
      const result = await stripe?.redirectToCheckout({ sessionId: session.id });

      if (result?.error) {
        alert(result.error.message);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2 className="payment-title">Payment for {state.name}</h2>
        <p className="payment-location">{state.location}</p>
        <p className="payment-rooms">Rooms Booked: {state.selectedRooms}</p>
        <p className="payment-amount">Total Amount: ₹{state.pricePerNight * state.selectedRooms}</p>

        <button
  onClick={handleStripePayment}
  className="payment-button"
  disabled={loading}
>
  {loading ? (
    <div className="activity-indicator"></div>
  ) : (
    'Pay with Stripe'
  )}
</button>

      </div>
    </div>
  );
}

export default PaymentPage;
