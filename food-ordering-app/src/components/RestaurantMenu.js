import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import mockMenusById from '../assets/MockMenus';
import { loadRestaurantMenu, MENU_IMAGE_URL } from '../utils/menuApi';
import { resolveRestaurantBySlug } from '../utils/listApi';

const formatCost = (info) => {
    if (info?.costForTwoMessage) {
        return info.costForTwoMessage;
    }
    if (typeof info?.costForTwo === 'number') {
        return `₹${info.costForTwo / 100} for two`;
    }
    return '';
};

const isRecommendedSection = (title = '') => /recommend/i.test(title);

const RestaurantMenu = () => {
    const { resName } = useParams();
    const preview = useLocation().state?.restaurant;
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [vegOnly, setVegOnly] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchMenu = async () => {
            setLoading(true);
            setStatus('');
            setVegOnly(false);

            const restaurant = await resolveRestaurantBySlug(resName, preview);
            const restaurantId = restaurant?.id;
            const payload = restaurantId ? await loadRestaurantMenu(restaurantId) : null;

            if (cancelled) {
                return;
            }

            if (payload?.sections?.length) {
                setMenu(payload);
                setStatus(
                    payload.source === 'swiggy-proxy' || payload.source === 'swiggy'
                        ? 'Loaded menu from Swiggy'
                        : 'Loaded menu from API'
                );
            } else if (restaurantId && mockMenusById[String(restaurantId)]) {
                setMenu(mockMenusById[String(restaurantId)]);
                setStatus('API did not return JSON. Showing mock menu.');
            } else {
                const fallbackName = restaurant?.name || resName.replace(/-/g, ' ');
                setMenu({
                    info: restaurant
                        ? {
                              id: restaurant.id,
                              name: restaurant.name,
                              cuisines: restaurant.cuisines,
                              avgRating: restaurant.rating,
                              costForTwoMessage:
                                  typeof restaurant.costForTwo === 'number'
                                      ? `₹${restaurant.costForTwo} for two`
                                      : restaurant.costForTwo,
                              sla: { deliveryTime: restaurant.deliveryTime },
                          }
                        : { name: fallbackName },
                    sections: [],
                });
                setStatus(
                    restaurant
                        ? 'Could not load a menu for this restaurant yet. Make sure the Swiggy proxy is running.'
                        : `No restaurant found for "${resName}".`
                );
            }

            setLoading(false);
        };

        fetchMenu();
        return () => {
            cancelled = true;
        };
    }, [resName, preview]);

    const filteredSections = useMemo(() => {
        if (!menu?.sections?.length) {
            return [];
        }

        return menu.sections
            .map((section) => ({
                ...section,
                items: vegOnly ? section.items.filter((item) => item.isVeg) : section.items,
            }))
            .filter((section) => section.items.length);
    }, [menu, vegOnly]);

    const recommended = filteredSections.filter((section) => isRecommendedSection(section.title));
    const otherSections = filteredSections.filter((section) => !isRecommendedSection(section.title));

    if (loading) {
        return (
            <div className="menu-page">
                <Shimmer />
            </div>
        );
    }

    const info = menu?.info || {};
    const cuisines = Array.isArray(info.cuisines) ? info.cuisines.join(', ') : '';
    const rating = info.avgRating ?? info.avgRatingString ?? preview?.rating;
    const deliveryTime = info.sla?.deliveryTime ?? preview?.deliveryTime;

    const renderSection = (section) => (
        <section key={`${section.title}-${section.items[0]?.id || 'section'}`} className="menu-section">
            <h2>
                {section.title} ({section.items.length})
            </h2>
            <ul className="menu-list">
                {section.items.map((item, index) => (
                    <li key={item.id ?? `${section.title}-${index}`} className="menu-item">
                        <div>
                            <p className="menu-item-name">
                                <span
                                    className={item.isVeg ? 'veg-dot' : 'nonveg-dot'}
                                    aria-hidden="true"
                                />
                                {item.name}
                                {item.isBestseller ? (
                                    <span className="bestseller-tag">Bestseller</span>
                                ) : null}
                            </p>
                            {item.price ? <p className="menu-item-price">₹{item.price}</p> : null}
                            {item.rating ? (
                                <p className="menu-item-rating">{item.rating} ★</p>
                            ) : null}
                            {item.description ? (
                                <p className="menu-item-desc">{item.description}</p>
                            ) : null}
                        </div>
                        {item.imageId ? (
                            <img
                                className="menu-item-img"
                                src={`${MENU_IMAGE_URL}${item.imageId}`}
                                alt={item.name}
                            />
                        ) : null}
                    </li>
                ))}
            </ul>
        </section>
    );

    return (
        <div className="menu-page">
            <Link className="menu-back" to="/">
                ← Back to restaurants
            </Link>
            <div className="menu-header">
                <div>
                    <p className="page-kicker">Restaurant</p>
                    <h1>{info.name || preview?.name || 'Restaurant'}</h1>
                    {cuisines ? <p className="menu-cuisines">{cuisines}</p> : null}
                    <p className="menu-meta">
                        {rating ? <span>{rating} ★</span> : null}
                        {deliveryTime ? <span>{deliveryTime} mins</span> : null}
                        {formatCost(info) ? <span>{formatCost(info)}</span> : null}
                    </p>
                    {(info.locality || info.areaName) && (
                        <p className="menu-area">
                            {[info.locality, info.areaName].filter(Boolean).join(', ')}
                        </p>
                    )}
                </div>
            </div>

            <div className="menu-toolbar">
                <label className="veg-toggle">
                    <input
                        type="checkbox"
                        checked={vegOnly}
                        onChange={(event) => setVegOnly(event.target.checked)}
                    />
                    <span>Veg only</span>
                </label>
            </div>

            {status ? <p className="api-status">{status}</p> : null}

            {recommended.map(renderSection)}
            {otherSections.map(renderSection)}

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
