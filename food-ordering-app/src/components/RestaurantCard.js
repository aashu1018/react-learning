import { Link } from 'react-router-dom';
import { restaurantSlug } from '../utils/restaurantSlug';
import { formatCostForTwo } from '../utils/formatters';
import ImageWithFallback from './ImageWithFallback';

const RestaurantCard = ({ restaurant }) => {
    const { name, cuisines, costForTwo, rating, deliveryTime, image, isVeg } = restaurant;

    return (
        <Link
            className="res-card-link"
            to={`/restaurants/${restaurantSlug(name)}`}
            state={{ restaurant }}
        >
            <div className="res-card">
                <div className="res-img-wrap">
                    <ImageWithFallback className="res-logo" src={image} alt={name} />
                    <span className="res-rating">{rating} ★</span>
                    {isVeg ? <span className="res-veg-badge">Veg</span> : null}
                </div>
                <div className="res-card-body">
                    <h3 className="res-name">{name}</h3>
                    <p className="res-cuisines">{cuisines.join(', ')}</p>
                    <div className="res-meta">
                        <span>{formatCostForTwo(costForTwo)}</span>
                        <span>{deliveryTime} mins</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
