import { useCart } from './CartProvider';
import { flyToCart } from '../utils/flyToCart';

const QtyControl = ({ payload }) => {
    const { items, addItem, increaseItem, decreaseItem } = useCart();
    const inCart = items.find((entry) => entry.id === payload.id);

    if (!inCart) {
        return (
            <button
                className="add-to-cart-btn"
                type="button"
                onClick={(event) => {
                    flyToCart(event.currentTarget);
                    addItem(payload);
                }}
            >
                Add
            </button>
        );
    }

    return (
        <div className="qty-stepper">
            <button
                type="button"
                aria-label={`Decrease ${payload.name}`}
                onClick={() => decreaseItem(payload.id)}
            >
                −
            </button>
            <span>{inCart.quantity}</span>
            <button
                type="button"
                aria-label={`Increase ${payload.name}`}
                onClick={() => increaseItem(payload.id)}
            >
                +
            </button>
        </div>
    );
};

export default QtyControl;
