import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from 'url:../assets/Logo.png';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <button
                            className="login-btn"
                            type="button"
                            onClick={() => setIsLoggedIn((prev) => !prev)}
                        >
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
