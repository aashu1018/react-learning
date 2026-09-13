import { Link } from 'react-router-dom';
import { MENU_IMAGE_URL } from '../constants/swiggy';
import { restaurantSlug } from '../utils/restaurantSlug';
import { useCart } from './CartProvider';
import CartBillDetails from './CartBillDetails';
import ImageWithFallback from './ImageWithFallback';
import { DELIVERY_AREA } from '../constants/swiggy';

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
                <p>Your cart is empty. Add a dish from a restaurant or items from Grocery.</p>
                <p>
                    <Link className="menu-back" to="/">
                        Browse restaurants
                    </Link>
                </p>
                <p>
                    <Link className="menu-back" to="/grocery">
                        Browse grocery
                    </Link>
                </p>
            </div>
        );
    }

    const isGrocery = items[0]?.vertical === 'grocery';
    const sourceName = items.find((item) => item.restaurantName)?.restaurantName;
    const addMorePath = isGrocery
        ? sourceName
            ? `/grocery/${restaurantSlug(sourceName)}`
            : '/grocery'
        : sourceName
          ? `/restaurants/${restaurantSlug(sourceName)}`
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
                    {sourceName
                        ? `Ordering from ${sourceName} · Delivering to ${DELIVERY_AREA}`
                        : `Delivering to ${DELIVERY_AREA}`}
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
                                {item.vertical === 'grocery' ? null : (
                                    <span
                                        className={item.isVeg ? 'veg-dot' : 'nonveg-dot'}
                                        aria-hidden="true"
                                    />
                                )}
                                {item.name}
                            </p>
                            {item.unit ? (
                                <p className="cart-item-restaurant">{item.unit}</p>
                            ) : null}
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
                        {item.emoji && !item.imageId ? (
                            <span className="cart-item-emoji" aria-hidden="true">
                                {item.emoji}
                            </span>
                        ) : item.imageId ? (
                            <ImageWithFallback
                                className="cart-item-img"
                                src={`${MENU_IMAGE_URL}${item.imageId}`}
                                alt={item.name}
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
