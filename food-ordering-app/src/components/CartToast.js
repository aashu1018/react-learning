import { useCart } from './CartProvider';

const CartToast = () => {
    const { toast, openCart } = useCart();

    if (!toast) {
        return null;
    }

    return (
        <div className="cart-toast" role="status">
            <span>{toast.name} added</span>
            <button type="button" className="cart-toast-view" onClick={openCart}>
                View cart
            </button>
        </div>
    );
};

export default CartToast;
