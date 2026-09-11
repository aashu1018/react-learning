import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => (
    <div className="res-container">
        {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
    </div>
);

export default RestaurantList;
