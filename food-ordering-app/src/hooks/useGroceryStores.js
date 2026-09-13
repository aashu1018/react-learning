import { useMemo, useState } from 'react';
import { GROCERY_STORES } from '../assets/groceryData';
import {
    filterFastGrocery,
    filterGroceryStores,
    filterTopRatedGrocery,
} from '../utils/groceryFilters';

const applyGroceryFilters = (stores, searchText, filter) => {
    let next = stores;
    if (filter === 'top') {
        next = filterTopRatedGrocery(next);
    }
    if (filter === 'fast') {
        next = filterFastGrocery(next);
    }
    return filterGroceryStores(next, searchText);
};

const useGroceryStores = () => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const stores = useMemo(
        () => applyGroceryFilters(GROCERY_STORES, searchText, filter),
        [searchText, filter]
    );

    return {
        stores,
        searchText,
        setSearchText,
        filter,
        showTopRated: () => setFilter('top'),
        showFastDelivery: () => setFilter('fast'),
        showAll: () => {
            setSearchText('');
            setFilter('all');
        },
    };
};

export default useGroceryStores;
