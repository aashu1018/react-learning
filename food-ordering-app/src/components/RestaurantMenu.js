import { Link, useLocation, useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import MenuHeader from './menu/MenuHeader';
import MenuSection from './menu/MenuSection';
import VegToggle from './menu/VegToggle';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantMenu = () => {
    const { resName } = useParams();
    const preview = useLocation().state?.restaurant;
    const {
        menu,
        loading,
        status,
        vegOnly,
        setVegOnly,
        filteredSections,
        recommended,
        otherSections,
    } = useRestaurantMenu(resName, preview);

    if (loading) {
        return (
            <div className="menu-page">
                <Shimmer />
            </div>
        );
    }

    return (
        <div className="menu-page">
            <Link className="menu-back" to="/">
                ← Back to restaurants
            </Link>
            <MenuHeader info={menu?.info || {}} preview={preview} />
            <VegToggle checked={vegOnly} onChange={setVegOnly} />
            {status ? <p className="api-status">{status}</p> : null}
            {recommended.map((section) => (
                <MenuSection key={`rec-${section.title}`} section={section} />
            ))}
            {otherSections.map((section) => (
                <MenuSection key={section.title} section={section} />
            ))}
            {!filteredSections.length ? (
                <p>
                    {vegOnly
                        ? 'No vegetarian items in this menu.'
                        : 'No menu items to show for this restaurant.'}
                </p>
            ) : null}
        </div>
    );
};

export default RestaurantMenu;
