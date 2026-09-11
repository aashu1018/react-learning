import { MENU_IMAGE_URL } from '../../constants/swiggy';

const MenuItem = ({ item }) => (
    <li className="menu-item">
        <div>
            <p className="menu-item-name">
                <span className={item.isVeg ? 'veg-dot' : 'nonveg-dot'} aria-hidden="true" />
                {item.name}
                {item.isBestseller ? <span className="bestseller-tag">Bestseller</span> : null}
            </p>
            {item.price ? <p className="menu-item-price">₹{item.price}</p> : null}
            {item.rating ? <p className="menu-item-rating">{item.rating} ★</p> : null}
            {item.description ? <p className="menu-item-desc">{item.description}</p> : null}
        </div>
        {item.imageId ? (
            <img
                className="menu-item-img"
                src={`${MENU_IMAGE_URL}${item.imageId}`}
                alt={item.name}
                loading="lazy"
            />
        ) : null}
    </li>
);

export default MenuItem;
