import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from 'url:../assets/Logo.png';
import LoginButton from './LoginButton';
import { useCart } from './CartProvider';
import { DELIVERY_AREA } from '../constants/swiggy';

const THEME_KEY = 'quickbite-theme';

const Header = () => {
    const { itemCount, isCartOpen, openCart } = useCart();
    const { pathname } = useLocation();
    const foodActive = pathname === '/' || pathname.startsWith('/restaurants');
    const groceryActive = pathname.startsWith('/grocery');

    const [theme, setTheme] = useState(() => window.localStorage.getItem(THEME_KEY) || '');

    useEffect(() => {
        if (theme) {
            document.documentElement.dataset.theme = theme;
            window.localStorage.setItem(THEME_KEY, theme);
        } else {
            delete document.documentElement.dataset.theme;
        }
    }, [theme]);

    const isDarkNow = theme
        ? theme === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

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
                <button
                    type="button"
                    className={`cart-nav${isCartOpen ? ' active' : ''}`}
                    onClick={openCart}
                    data-cart-target
                >
                    Cart
                    {itemCount ? <span className="cart-badge">{itemCount}</span> : null}
                </button>
                <button
                    type="button"
                    className="theme-toggle"
                    aria-label={isDarkNow ? 'Switch to light theme' : 'Switch to dark theme'}
                    onClick={() => setTheme(isDarkNow ? 'light' : 'dark')}
                >
                    {isDarkNow ? '☀️' : '🌙'}
                </button>
                <LoginButton />
            </div>
        </header>
    );
};

export default Header;
