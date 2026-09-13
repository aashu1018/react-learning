import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from 'url:../assets/Logo.png';
import LoginButton from './LoginButton';
import { useCart } from './CartProvider';
import { DELIVERY_AREA } from '../constants/swiggy';

const Header = () => {
    const { itemCount } = useCart();
    const { pathname } = useLocation();
    const foodActive = pathname === '/' || pathname.startsWith('/restaurants');
    const groceryActive = pathname.startsWith('/grocery');

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo-container">
                    <img className="logo" src={logo} alt="QuickBite" />
                </Link>
                <span className="location-chip">{DELIVERY_AREA}</span>
                <nav className="vertical-nav" aria-label="Verticals">
                    <Link to="/" className={foodActive ? 'active' : ''}>
                        Food
                    </Link>
                    <Link to="/grocery" className={groceryActive ? 'active' : ''}>
                        Grocery
                    </Link>
                </nav>
            </div>
            <div className="header-right">
                <NavLink to="/cart" className="cart-nav">
                    Cart
                    {itemCount ? <span className="cart-badge">{itemCount}</span> : null}
                </NavLink>
                <LoginButton />
            </div>
        </header>
    );
};

export default Header;
