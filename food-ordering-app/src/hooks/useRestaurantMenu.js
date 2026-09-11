import { useEffect, useMemo, useState } from 'react';
import mockMenusById from '../assets/MockMenus';
import { loadRestaurantMenu } from '../utils/menuApi';
import { resolveRestaurantBySlug } from '../utils/resolveRestaurant';
import { restaurantToMenuInfo } from '../utils/formatters';
import { filterMenuSections, splitRecommendedSections } from '../utils/menuFilters';
import { setCachedMenu } from '../utils/cache';

const useRestaurantMenu = (resName, preview) => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [vegOnly, setVegOnly] = useState(false);
    const previewId = preview?.id;

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
                    payload.source === 'swiggy-proxy'
                        ? 'Loaded menu from Swiggy'
                        : 'Loaded menu from cache'
                );
            } else if (restaurantId && mockMenusById[String(restaurantId)]) {
                const mockMenu = mockMenusById[String(restaurantId)];
                setCachedMenu(restaurantId, mockMenu);
                setMenu(mockMenu);
                setStatus('API did not return JSON. Showing mock menu.');
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
        () => filterMenuSections(menu?.sections, { vegOnly }),
        [menu, vegOnly]
    );

    const { recommended, otherSections } = useMemo(
        () => splitRecommendedSections(filteredSections),
        [filteredSections]
    );

    return {
        menu,
        loading,
        status,
        vegOnly,
        setVegOnly,
        filteredSections,
        recommended,
        otherSections,
        preview,
    };
};

export default useRestaurantMenu;
