import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from 'url:./Logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={logo} alt="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    );
};

const RestaurantCard = () => {
    return (
        <div className="res-card">

        </div>
    )
}

const Body = () => {
    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="res-contsiner">

            </div>
        </div>
    )
}

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
