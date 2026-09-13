import { useEffect, useMemo, useState } from 'react';
import mockMenusById from '../assets/MockMenus';
import { loadRestaurantMenu } from '../utils/menuApi';
import { resolveRestaurantBySlug } from '../utils/resolveRestaurant';
import { restaurantToMenuInfo } from '../utils/formatters';
import { filterMenuSections, splitRecommendedSections, withBestsellersSection } from '../utils/menuFilters';
import { restaurantSlug } from '../utils/restaurantSlug';
import { setCachedMenu } from '../utils/cache';

const useRestaurantMenu = (resName, preview) => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [vegOnly, setVegOnly] = useState(false);
    const [query, setQuery] = useState('');
    const previewId = preview?.id;

    useEffect(() => {
        let cancelled = false;

        const fetchMenu = async () => {
            setLoading(true);
            setStatus('');
            setVegOnly(false);
            setQuery('');

            const restaurant = await resolveRestaurantBySlug(resName, preview);
            const restaurantId = restaurant?.id;
            const payload = restaurantId ? await loadRestaurantMenu(restaurantId) : null;

            if (cancelled) {
                return;
            }

            if (payload?.sections?.length) {
                setMenu(payload);
                setStatus('');
            } else if (restaurantId && mockMenusById[String(restaurantId)]) {
                const mockMenu = mockMenusById[String(restaurantId)];
                setCachedMenu(restaurantId, mockMenu);
                setMenu(mockMenu);
                setStatus('');
            } else {
                const fallbackName = restaurant?.name || resName.replace(/-/g, ' ');
                setMenu({
                    info: restaurantToMenuInfo(restaurant, fallbackName),
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
    }, [resName, previewId]);

    const filteredSections = useMemo(
        () => filterMenuSections(menu?.sections, { vegOnly, query }),
        [menu, vegOnly, query]
    );

    const displaySections = useMemo(() => {
        const { recommended, otherSections } = splitRecommendedSections(filteredSections);
        const ordered = withBestsellersSection([...recommended, ...otherSections]);

        return ordered.map((section, index) => ({
            ...section,
            id: `menu-${index}-${restaurantSlug(section.title)}`,
        }));
    }, [filteredSections]);

    return {
        menu,
        loading,
        status,
        vegOnly,
        setVegOnly,
        query,
        setQuery,
        filteredSections,
        displaySections,
        preview,
    };
};

export default useRestaurantMenu;
