import { useMemo, useState } from 'react';
import { GROCERY_STORES } from '../assets/groceryData';
import {
    filterFastGrocery,
    filterGroceryStores,
    filterTopRatedGrocery,
} from '../utils/groceryFilters';

const useGroceryStores = () => {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(GROCERY_STORES);

    const status = useMemo(() => `${GROCERY_STORES.length} stores delivering nearby`, []);

    return {
        stores: list,
        searchText,
        setSearchText,
        status,
        search: () => setList(filterGroceryStores(GROCERY_STORES, searchText)),
        showTopRated: () => setList(filterTopRatedGrocery(GROCERY_STORES)),
        showFastDelivery: () => setList(filterFastGrocery(GROCERY_STORES)),
        showAll: () => {
            setSearchText('');
            setList(GROCERY_STORES);
        },
    };
};

export default useGroceryStores;
