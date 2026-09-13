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
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        setActiveId(displaySections[0]?.id || '');
    }, [displaySections]);

    useEffect(() => {
        if (!displaySections.length) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]?.target?.id) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-140px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
        );

        displaySections.forEach((section) => {
            const node = document.getElementById(section.id);
            if (node) {
                observer.observe(node);
            }
        });

        return () => observer.disconnect();
    }, [displaySections]);

    const scrollToSection = (id) => {
        const node = document.getElementById(id);
        if (!node) {
            return;
        }
        setActiveId(id);
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                        scrollToSection(displaySections[0].id);
                    }
                }}
            />
            <MenuCategoryRail
                sections={displaySections}
                activeId={activeId}
                onSelect={scrollToSection}
            />
            {status ? <p className="api-status">{status}</p> : null}
            {displaySections.map((section) => (
                <MenuSection
                    key={section.id}
                    section={section}
                    restaurantName={restaurantName}
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
