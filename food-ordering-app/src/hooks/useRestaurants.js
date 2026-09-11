import { useEffect, useState } from 'react';
import mockRestaurants from '../assets/MockData';
import { loadRestaurantList } from '../utils/listApi';
import {
    filterBySearch,
    filterFastDelivery,
    filterTopRated,
} from '../utils/restaurantFilters';

const useRestaurants = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchRestaurants = async () => {
            setLoading(true);
            setStatus('');

            const [mapped] = await Promise.all([
                loadRestaurantList(),
                new Promise((resolve) => setTimeout(resolve, 500)),
            ]);

            if (cancelled) {
                return;
            }

            if (mapped.length) {
                setAllRestaurants(mapped);
                setListOfRestaurants(mapped);
                setStatus(`Loaded ${mapped.length} restaurants from Swiggy`);
            } else {
                setAllRestaurants(mockRestaurants);
                setListOfRestaurants(mockRestaurants);
                setStatus('Swiggy API did not return restaurants. Showing mock data.');
            }

            setLoading(false);
        };

        fetchRestaurants();
        return () => {
            cancelled = true;
        };
    }, []);

    return {
        listOfRestaurants,
        searchText,
        setSearchText,
        loading,
        status,
        search: () => setListOfRestaurants(filterBySearch(allRestaurants, searchText)),
        showTopRated: () => setListOfRestaurants(filterTopRated(allRestaurants)),
        showFastDelivery: () => setListOfRestaurants(filterFastDelivery(allRestaurants)),
        showAll: () => {
            setSearchText('');
            setListOfRestaurants(allRestaurants);
        },
    };
};

export default useRestaurants;
