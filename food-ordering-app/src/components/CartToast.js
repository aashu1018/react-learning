import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';

const CartToast = () => {
    const { toast } = useCart();

    if (!toast) {
        return null;
    }

    return (
        <div className="cart-toast" role="status">
            <span>{toast.name} added</span>
            <Link to="/cart">View cart</Link>
        </div>
    );
};

export default CartToast;
