import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartProvider';

const MobileNav = () => {
    const { itemCount, isCartOpen, openCart } = useCart();
    const { pathname } = useLocation();
    const foodActive = pathname === '/' || pathname.startsWith('/restaurants');
    const groceryActive = pathname.startsWith('/grocery');
    const cartActive =
        isCartOpen || pathname.startsWith('/cart') || pathname.startsWith('/payment');

    return (
        <nav className="mobile-nav" aria-label="Primary">
            <Link to="/" className={foodActive ? 'active' : ''}>
                Food
            </Link>
            <Link to="/grocery" className={groceryActive ? 'active' : ''}>
                Grocery
            </Link>
            <button type="button" className={cartActive ? 'active' : ''} onClick={openCart}>
                Cart
                {itemCount ? <span className="cart-badge">{itemCount}</span> : null}
            </button>
        </nav>
    );
};

export default MobileNav;
