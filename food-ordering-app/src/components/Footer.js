import { Link } from 'react-router-dom';
import { DELIVERY_AREA } from '../constants/swiggy';

const Footer = () => (
    <footer className="site-footer">
        <p>Delivering to {DELIVERY_AREA}</p>
        <nav aria-label="Company">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    </footer>
);

export default Footer;
