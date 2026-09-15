import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MENU_IMAGE_URL } from '../constants/swiggy';
import { useCart } from './CartProvider';
import CartBillDetails from './CartBillDetails';
import ImageWithFallback from './ImageWithFallback';

const CartDrawer = () => {
    const {
        items,
        itemCount,
        itemTotal,
        deliveryFee,
        platformFee,
        gst,
        gstRatePercent,
        grandTotal,
        isCartOpen,
        closeCart,
        increaseItem,
        decreaseItem,
        removeItem,
    } = useCart();

    useEffect(() => {
        if (!isCartOpen) {
            return undefined;
        }

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeCart();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isCartOpen, closeCart]);

    return (
        <div
            className={`cart-drawer-backdrop${isCartOpen ? ' is-open' : ''}`}
            aria-hidden={!isCartOpen}
            onClick={closeCart}
        >
            <aside
                className="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Your cart"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="cart-drawer-header">
                    <h2>Your cart{itemCount ? ` (${itemCount})` : ''}</h2>
                    <button
                        className="cart-drawer-close"
                        type="button"
                        aria-label="Close cart"
                        onClick={closeCart}
                    >
                        ✕
                    </button>
                </div>

                {items.length ? (
                    <>
                        <ul className="cart-drawer-list">
                            {items.map((item) => (
                                <li key={item.id} className="cart-drawer-item">
                                    {item.imageId ? (
                                        <ImageWithFallback
                                            className="cart-item-img"
                                            src={`${MENU_IMAGE_URL}${item.imageId}`}
                                            alt={item.name}
                                        />
                                    ) : item.emoji ? (
                                        <span className="cart-item-emoji" aria-hidden="true">
                                            {item.emoji}
                                        </span>
                                    ) : null}
                                    <div className="cart-drawer-item-info">
                                        <p className="cart-item-name">
                                            {item.vertical === 'grocery' ? null : (
                                                <span
                                                    className={item.isVeg ? 'veg-dot' : 'nonveg-dot'}
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {item.name}
                                        </p>
                                        <p className="cart-item-price">₹{item.price}</p>
                                        <div className="cart-qty-controls">
                                            <button
                                                type="button"
                                                aria-label={`Decrease ${item.name}`}
                                                onClick={() => decreaseItem(item.id)}
                                            >
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                type="button"
                                                aria-label={`Increase ${item.name}`}
                                                onClick={() => increaseItem(item.id)}
                                            >
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

                        <div className="cart-drawer-footer">
                            <Link className="menu-back" to="/cart" onClick={closeCart}>
                                View full cart
                            </Link>
                            <Link
                                className="search-btn cart-checkout-link"
                                to="/payment"
                                onClick={closeCart}
                            >
                                Checkout · ₹{grandTotal}
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="cart-drawer-empty">
                        <p>Your cart is empty.</p>
                        <Link className="menu-back" to="/" onClick={closeCart}>
                            Browse restaurants
                        </Link>
                    </div>
                )}
            </aside>
        </div>
    );
};

export default CartDrawer;
