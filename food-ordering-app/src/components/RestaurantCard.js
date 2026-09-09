import { Link } from 'react-router-dom';
import { restaurantSlug } from '../utils/restaurantSlug';

const RestaurantCard = ({ restaurant }) => {
    const { name, cuisines, dishes, costForTwo, rating, deliveryTime, image } = restaurant;

    return (
        <Link
            className="res-card-link"
            to={`/restaurants/${restaurantSlug(name)}`}
            state={{ restaurant }}
        >
            <div className="res-card">
                <div className="res-img-wrap">
                    <img
                        className="res-logo"
                        src={
                            image ||
                            'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/placeholder'
                        }
                        alt={name}
                    />
                    <span className="res-rating">{rating} ★</span>
                </div>
                <div className="res-card-body">
                    <h3 className="res-name">{name}</h3>
                    <p className="res-cuisines">{cuisines.join(', ')}</p>
                    {dishes?.length ? (
                        <ul className="res-dishes">
                            {dishes.map((dish, index) => (
                                <li key={`${dish}-${index}`}>{dish}</li>
                            ))}
                        </ul>
                    ) : null}
                    <div className="res-meta">
                        <span>
                            {typeof costForTwo === 'number'
                                ? `₹${costForTwo} for two`
                                : costForTwo}
                        </span>
                        <span>{deliveryTime} mins</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
