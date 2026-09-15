import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import MenuHeader from './menu/MenuHeader';
import MenuSection from './menu/MenuSection';
import MenuCategoryRail from './menu/MenuCategoryRail';
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
        query,
        setQuery,
        displaySections,
    } = useRestaurantMenu(resName, preview);
    const [openId, setOpenId] = useState('');

    useEffect(() => {
        setOpenId(displaySections[0]?.id || '');
    }, [displaySections]);

    const openSection = (id) => {
        setOpenId(id);
        const node = document.getElementById(id);
        if (node) {
            node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const toggleSection = (id) => {
        setOpenId((current) => (current === id ? '' : id));
    };

    if (loading) {
        return (
            <div className="menu-page">
                <Shimmer />
            </div>
        );
    }

    const restaurantName = menu?.info?.name || preview?.name || 'Restaurant';

    return (
        <div className="menu-page">
            <Link className="menu-back" to="/">
                ← Back to restaurants
            </Link>
            <MenuHeader info={menu?.info || {}} preview={preview} />
            <VegToggle
                checked={vegOnly}
                onChange={setVegOnly}
                query={query}
                onQueryChange={setQuery}
                onSearch={() => {
                    if (displaySections[0]) {
                        openSection(displaySections[0].id);
                    }
                }}
            />
            <MenuCategoryRail
                sections={displaySections}
                activeId={openId}
                onSelect={openSection}
            />
            {status ? <p className="api-status">{status}</p> : null}
            {displaySections.map((section) => (
                <MenuSection
                    key={section.id}
                    section={section}
                    restaurantName={restaurantName}
                    isOpen={openId === section.id}
                    onToggle={() => toggleSection(section.id)}
                />
            ))}
            {!displaySections.length ? (
                <p className="empty-copy">
                    {query
                        ? 'No dishes match that search.'
                        : vegOnly
                          ? 'No vegetarian items in this menu.'
                          : 'No menu items to show for this restaurant.'}
                </p>
            ) : null}
        </div>
    );
};

export default RestaurantMenu;
