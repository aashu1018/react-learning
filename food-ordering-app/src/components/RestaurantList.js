import RestaurantCard from './RestaurantCard';
import withPromotedLabel from './withPromotedLabel';

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const RestaurantList = ({ restaurants }) => (
    <div className="res-container">
        {restaurants.map((restaurant) =>
            restaurant.promoted ? (
                <RestaurantCardPromoted key={restaurant.id} restaurant={restaurant} />
            ) : (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            )
        )}
    </div>
);

export default RestaurantList;
