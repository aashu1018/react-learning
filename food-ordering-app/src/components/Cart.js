import { Link } from 'react-router-dom';
import { MENU_IMAGE_URL } from '../constants/swiggy';
import { restaurantSlug } from '../utils/restaurantSlug';
import { useCart } from './CartProvider';
import CartBillDetails from './CartBillDetails';

const Cart = () => {
    const {
        items,
        itemCount,
        itemTotal,
        deliveryFee,
        platformFee,
        gst,
        gstRatePercent,
        grandTotal,
        increaseItem,
        decreaseItem,
        removeItem,
        clearCart,
    } = useCart();

    if (!items.length) {
        return (
            <div className="page">
                <h1>Cart</h1>
                <p>Your cart is empty. Open a restaurant and tap Add on a dish.</p>
                <Link className="menu-back" to="/">
                    Browse restaurants
                </Link>
            </div>
        );
    }

    const restaurantName = items.find((item) => item.restaurantName)?.restaurantName;
    const addMorePath = restaurantName
        ? `/restaurants/${restaurantSlug(restaurantName)}`
        : '/';

    return (
        <div className="page cart-page">
            <div className="cart-header-row">
                <h1>Cart ({itemCount})</h1>
                <button className="cart-clear-btn" type="button" onClick={clearCart}>
                    Clear cart
                </button>
            </div>

            <div className="cart-add-more-bar">
                <p>
                    {restaurantName
                        ? `Ordering from ${restaurantName}`
                        : 'Want something else too?'}
                </p>
                <Link className="cart-add-more-link" to={addMorePath}>
                    + Add more items
                </Link>
            </div>

            <ul className="cart-list">
                {items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <div className="cart-item-info">
                            <p className="cart-item-name">
                                <span
                                    className={item.isVeg ? 'veg-dot' : 'nonveg-dot'}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </p>
                            {item.restaurantName ? (
                                <p className="cart-item-restaurant">{item.restaurantName}</p>
                            ) : null}
                            <p className="cart-item-price">
                                ₹{item.price} × {item.quantity} = ₹
                                {(item.price * item.quantity).toFixed(0)}
                            </p>
                            <div className="cart-qty-controls">
                                <button type="button" onClick={() => decreaseItem(item.id)}>
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button type="button" onClick={() => increaseItem(item.id)}>
                                    +
                                </button>
                                <button
                                    className="cart-remove-btn"
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        {item.imageId ? (
                            <img
                                className="cart-item-img"
                                src={`${MENU_IMAGE_URL}${item.imageId}`}
                                alt={item.name}
                                loading="lazy"
                            />
                        ) : null}
                    </li>
                ))}
            </ul>

            <CartBillDetails
                itemTotal={itemTotal}
                deliveryFee={deliveryFee}
                platformFee={platformFee}
                gst={gst}
                gstRatePercent={gstRatePercent}
                grandTotal={grandTotal}
            />

            <div className="cart-summary">
                <p>
                    To pay: <strong>₹{grandTotal}</strong>
                </p>
                <div className="cart-summary-actions">
                    <Link className="cart-browse-link" to={addMorePath}>
                        Add more items
                    </Link>
                    <Link className="search-btn cart-checkout-link" to="/payment">
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
