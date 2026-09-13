import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';
import CartBillDetails from './CartBillDetails';

const Payment = () => {
    const {
        items,
        itemCount,
        itemTotal,
        deliveryFee,
        platformFee,
        gst,
        gstRatePercent,
        grandTotal,
        clearCart,
    } = useCart();
    const navigate = useNavigate();
    const [method, setMethod] = useState('upi');
    const [form, setForm] = useState({
        name: '',
        upiId: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [paid, setPaid] = useState(false);
    const [wasGrocery, setWasGrocery] = useState(false);

    if (!items.length && !paid) {
        return <Navigate to="/cart" replace />;
    }

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePay = (event) => {
        event.preventDefault();
        setWasGrocery(items[0]?.vertical === 'grocery');
        setPaid(true);
        clearCart();
    };

    if (paid) {
        return (
            <div className="page payment-page">
                <p className="page-kicker">Order confirmed</p>
                <h1>Payment successful</h1>
                <p className="page-lead">
                    Thanks{form.name ? `, ${form.name}` : ''}. Your order is placed
                    {wasGrocery
                        ? ' and the store is packing your groceries.'
                        : ' and the kitchen has started preparing it.'}
                </p>
                <div className="payment-actions">
                    <button
                        className="search-btn"
                        type="button"
                        onClick={() => navigate(wasGrocery ? '/grocery' : '/')}
                    >
                        {wasGrocery ? 'Back to grocery' : 'Back to restaurants'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page payment-page">
            <Link className="menu-back" to="/cart">
                ← Back to cart
            </Link>
            <p className="page-kicker">Checkout</p>
            <h1>Payment</h1>
            <p className="page-lead">
                Review your order and complete a mock payment. No real money is charged.
            </p>

            <section className="payment-summary">
                <h2>
                    Order summary ({itemCount} item{itemCount === 1 ? '' : 's'})
                </h2>
                <ul className="payment-summary-list">
                    {items.map((item) => (
                        <li key={item.id}>
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <CartBillDetails
                itemTotal={itemTotal}
                deliveryFee={deliveryFee}
                platformFee={platformFee}
                gst={gst}
                gstRatePercent={gstRatePercent}
                grandTotal={grandTotal}
            />

            <form className="contact-form payment-form" onSubmit={handlePay}>
                <label>
                    Full name
                    <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={updateField}
                        placeholder="Name on payment"
                    />
                </label>

                <fieldset className="payment-methods">
                    <legend>Payment method</legend>
                    <label className="payment-method-option">
                        <input
                            type="radio"
                            name="method"
                            value="upi"
                            checked={method === 'upi'}
                            onChange={() => setMethod('upi')}
                        />
                        UPI
                    </label>
                    <label className="payment-method-option">
                        <input
                            type="radio"
                            name="method"
                            value="card"
                            checked={method === 'card'}
                            onChange={() => setMethod('card')}
                        />
                        Card
                    </label>
                </fieldset>

                {method === 'upi' ? (
                    <label>
                        UPI ID
                        <input
                            name="upiId"
                            type="text"
                            required
                            value={form.upiId}
                            onChange={updateField}
                            placeholder="name@upi"
                        />
                    </label>
                ) : (
                    <>
                        <label>
                            Card number
                            <input
                                name="cardNumber"
                                type="text"
                                required
                                inputMode="numeric"
                                maxLength="19"
                                value={form.cardNumber}
                                onChange={updateField}
                                placeholder="XXXX XXXX XXXX XXXX"
                            />
                        </label>
                        <div className="payment-card-row">
                            <label>
                                Expiry
                                <input
                                    name="expiry"
                                    type="text"
                                    required
                                    value={form.expiry}
                                    onChange={updateField}
                                    placeholder="MM/YY"
                                />
                            </label>
                            <label>
                                CVV
                                <input
                                    name="cvv"
                                    type="password"
                                    required
                                    maxLength="4"
                                    value={form.cvv}
                                    onChange={updateField}
                                    placeholder="***"
                                />
                            </label>
                        </div>
                    </>
                )}

                <button className="search-btn" type="submit">
                    Pay ₹{grandTotal}
                </button>
            </form>
        </div>
    );
};

export default Payment;
