import { MENU_IMAGE_URL } from '../../constants/swiggy';
import QtyControl from '../QtyControl';
import ImageWithFallback from '../ImageWithFallback';

const MenuItem = ({ item, restaurantName }) => (
    <li className="menu-item">
        <div className="menu-item-main">
            <p className="menu-item-name">
                <span className={item.isVeg ? 'veg-dot' : 'nonveg-dot'} aria-hidden="true" />
                {item.name}
                {item.isBestseller ? <span className="bestseller-tag">Bestseller</span> : null}
            </p>
            {item.price ? <p className="menu-item-price">₹{item.price}</p> : null}
            {item.rating ? <p className="menu-item-rating">{item.rating} ★</p> : null}
            {item.description ? <p className="menu-item-desc">{item.description}</p> : null}
            <QtyControl
                payload={{
                    ...item,
                    restaurantName,
                    vertical: 'food',
                }}
            />
        </div>
        {item.imageId ? (
            <ImageWithFallback
                className="menu-item-img"
                src={`${MENU_IMAGE_URL}${item.imageId}`}
                alt={item.name}
            />
        ) : null}
    </li>
);

export default MenuItem;
