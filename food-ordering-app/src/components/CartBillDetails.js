const CartBillDetails = ({
    itemTotal,
    deliveryFee,
    platformFee,
    gst,
    gstRatePercent,
    grandTotal,
}) => (
    <div className="cart-bill">
        <h2>Bill details</h2>
        <ul className="cart-bill-list">
            <li>
                <span>Item total</span>
                <span>₹{itemTotal}</span>
            </li>
            <li>
                <span>Delivery fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
            </li>
            <li>
                <span>Platform fee</span>
                <span>₹{platformFee}</span>
            </li>
            <li>
                <span>GST ({gstRatePercent}%)</span>
                <span>₹{gst}</span>
            </li>
            <li className="cart-bill-total">
                <span>To pay</span>
                <span>₹{grandTotal}</span>
            </li>
        </ul>
        {deliveryFee === 0 && itemTotal > 0 ? (
            <p className="cart-bill-note">Yay! Delivery is free on this order.</p>
        ) : (
            <p className="cart-bill-note">Free delivery on orders above ₹199.</p>
        )}
    </div>
);

export default CartBillDetails;
