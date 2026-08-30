import RestaurantCard from "./RestaurantCard";

const Body = ({ restaurants }) => {
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

export default Body;