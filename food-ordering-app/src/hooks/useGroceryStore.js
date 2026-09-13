import { useMemo, useState } from 'react';
import { GROCERY_PRODUCTS, GROCERY_STORES } from '../assets/groceryData';
import { restaurantSlug } from '../utils/restaurantSlug';
import {
    filterGroceryProducts,
    groceryCategories,
    productsForStore,
} from '../utils/groceryFilters';

const useGroceryStore = (storeSlug) => {
    const store = useMemo(
        () => GROCERY_STORES.find((entry) => restaurantSlug(entry.name) === storeSlug),
        [storeSlug]
    );

    const catalog = useMemo(
        () => (store ? productsForStore(GROCERY_PRODUCTS, store.id) : []),
        [store]
    );

    const categories = useMemo(() => groceryCategories(catalog), [catalog]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('All');

    const products = useMemo(
        () => filterGroceryProducts(catalog, searchText, category),
        [catalog, searchText, category]
    );

    return {
        store,
        products,
        categories,
        searchText,
        setSearchText,
        category,
        setCategory,
    };
};

export default useGroceryStore;
