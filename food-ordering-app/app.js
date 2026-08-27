import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from 'url:./Logo.png';

const restaurants = [
    {
        id: 1,
        name: 'Meghana Foods',
        cuisines: ['Biryani', 'North Indian', 'Asian'],
        dishes: ['Hyderabadi Chicken Biryani', 'Butter Naan', 'Gulab Jamun'],
        costForTwo: 400,
        rating: 4.4,
        deliveryTime: 32,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        name: 'KFC',
        cuisines: ['Burgers', 'Fast Food', 'American'],
        dishes: ['Hot & Crispy Chicken', 'Zinger Burger', 'Popcorn Chicken'],
        costForTwo: 350,
        rating: 4.1,
        deliveryTime: 24,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        name: 'Domino\'s Pizza',
        cuisines: ['Pizzas', 'Italian', 'Pastas'],
        dishes: ['Farmhouse Pizza', 'Garlic Bread', 'Choco Lava Cake'],
        costForTwo: 500,
        rating: 4.2,
        deliveryTime: 28,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        name: 'Burger King',
        cuisines: ['Burgers', 'American', 'Fast Food'],
        dishes: ['Whopper', 'Chicken Fries', 'Oreo Shake'],
        costForTwo: 300,
        rating: 4.0,
        deliveryTime: 22,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 5,
        name: 'Sagar Ratna',
        cuisines: ['South Indian', 'Idli', 'Dosa'],
        dishes: ['Masala Dosa', 'Rava Idli', 'Filter Coffee'],
        costForTwo: 250,
        rating: 4.5,
        deliveryTime: 30,
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 6,
        name: 'The Belgian Waffle Co.',
        cuisines: ['Desserts', 'Waffles', 'Beverages'],
        dishes: ['Chocolate Waffle', 'Red Velvet', 'Iced Mocha'],
        costForTwo: 280,
        rating: 4.6,
        deliveryTime: 26,
        image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 7,
        name: 'Barbeque Nation',
        cuisines: ['BBQ', 'North Indian', 'Grill'],
        dishes: ['Tandoori Platter', 'Kebab Skewers', 'Kulcha'],
        costForTwo: 1200,
        rating: 4.3,
        deliveryTime: 40,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 8,
        name: 'Subway',
        cuisines: ['Healthy', 'Sandwiches', 'Salads'],
        dishes: ['Veggie Delite', 'Chicken Teriyaki', 'Cookie'],
        costForTwo: 320,
        rating: 4.0,
        deliveryTime: 20,
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 9,
        name: 'McDonald\'s',
        cuisines: ['Burgers', 'Fast Food', 'Cafe'],
        dishes: ['McAloo Tikki', 'McFlurry', 'Fries'],
        costForTwo: 280,
        rating: 4.1,
        deliveryTime: 18,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 10,
        name: 'Wow! Momo',
        cuisines: ['Tibetan', 'Momos', 'Chinese'],
        dishes: ['Steamed Chicken Momos', 'Fried Momos', 'Momo Soup'],
        costForTwo: 250,
        rating: 4.2,
        deliveryTime: 27,
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    },
];

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

const RestaurantCard = ({ restaurant }) => {
    const { name, cuisines, dishes, costForTwo, rating, deliveryTime, image } = restaurant;

    return (
        <div className="res-card">
            <div className="res-img-wrap">
                <img className="res-logo" src={image} alt={name} />
                <span className="res-rating">{rating} ★</span>
            </div>
            <div className="res-card-body">
                <h3 className="res-name">{name}</h3>
                <p className="res-cuisines">{cuisines.join(', ')}</p>
                <ul className="res-dishes">
                    {dishes.map((dish) => (
                        <li key={dish}>{dish}</li>
                    ))}
                </ul>
                <div className="res-meta">
                    <span>₹{costForTwo} for two</span>
                    <span>{deliveryTime} mins</span>
                </div>
            </div>
        </div>
    );
};

const Body = () => {
    return (
        <div className="body">
            <div className="search">
                <input className="search-input" type="text" placeholder="Search restaurants or dishes" />
                <button className="search-btn" type="button">Search</button>
            </div>
            <div className="res-container">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
