import { Link } from 'react-router-dom';
import { restaurantSlug } from '../../utils/restaurantSlug';

const GroceryStoreCard = ({ store }) => (
    <Link className="res-card-link" to={`/grocery/${restaurantSlug(store.name)}`}>
        <div className="res-card grocery-store-card">
            <div className="grocery-store-hero" aria-hidden="true">
                <span>{store.emoji}</span>
                <span className="res-rating">{store.rating} ★</span>
            </div>
            <div className="res-card-body">
                <h3 className="res-name">{store.name}</h3>
                <p className="res-cuisines">{store.tagline}</p>
                <div className="res-meta">
                    <span>{store.area}</span>
                    <span>{store.deliveryTime} mins</span>
                </div>
            </div>
        </div>
    </Link>
);

export default GroceryStoreCard;
