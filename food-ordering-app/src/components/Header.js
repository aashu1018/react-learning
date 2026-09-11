import { Link } from 'react-router-dom';
import logo from 'url:../assets/Logo.png';
import LoginButton from './LoginButton';

const Header = () => (
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
                    <LoginButton />
                </li>
            </ul>
        </div>
    </div>
);

export default Header;
