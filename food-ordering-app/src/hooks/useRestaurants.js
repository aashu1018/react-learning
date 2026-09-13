import { useEffect, useMemo, useState } from 'react';
import mockRestaurants from '../assets/MockData';
import { loadRestaurantList } from '../utils/listApi';
import {
    filterByCuisine,
    filterBySearch,
    filterFastDelivery,
    filterTopRated,
    filterVegRestaurants,
    popularCuisines,
} from '../utils/restaurantFilters';
import { setCachedRestaurantList } from '../utils/cache';

const applyRestaurantFilters = (restaurants, searchText, filter, cuisine, vegOnly) => {
    let next = restaurants;
    if (filter === 'top') {
        next = filterTopRated(next);
    }
    if (filter === 'fast') {
        next = filterFastDelivery(next);
    }
    if (vegOnly) {
        next = filterVegRestaurants(next);
    }
    next = filterByCuisine(next, cuisine);
    return filterBySearch(next, searchText);
};

const useRestaurants = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');
    const [cuisine, setCuisine] = useState('');
    const [vegOnly, setVegOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchRestaurants = async () => {
            setLoading(true);
            setStatus('');

            const mapped = await loadRestaurantList();

            if (cancelled) {
                return;
            }

            if (mapped.length) {
                setAllRestaurants(mapped);
            } else {
                setCachedRestaurantList(mockRestaurants);
                setAllRestaurants(mockRestaurants);
                setStatus('Live restaurants are unavailable. Showing a saved list.');
            }

            setLoading(false);
        };

        fetchRestaurants();
        return () => {
            cancelled = true;
        };
    }, []);

    const cuisines = useMemo(() => popularCuisines(allRestaurants), [allRestaurants]);

    return {
        listOfRestaurants: applyRestaurantFilters(
            allRestaurants,
            searchText,
            filter,
            cuisine,
            vegOnly
        ),
        searchText,
        setSearchText,
        filter,
        cuisine,
        setCuisine,
        vegOnly,
        setVegOnly,
        cuisines,
        loading,
        status,
        showTopRated: () => setFilter('top'),
        showFastDelivery: () => setFilter('fast'),
        showAll: () => {
            setSearchText('');
            setFilter('all');
            setCuisine('');
        },
    };
};

export default useRestaurants;
