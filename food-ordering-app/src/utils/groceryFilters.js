export const filterGroceryStores = (stores, searchText) => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
        return stores;
    }

    return stores.filter((store) =>
        [store.name, store.area, store.tagline].join(' ').toLowerCase().includes(query)
    );
};

export const filterTopRatedGrocery = (stores) => stores.filter((store) => store.rating >= 4.5);

export const filterFastGrocery = (stores) => stores.filter((store) => store.deliveryTime <= 15);

export const productsForStore = (products, storeId) =>
    products.filter((product) => product.storeId === storeId);

export const groceryCategories = (products) => [
    'All',
    ...Array.from(new Set(products.map((product) => product.category))),
];

export const filterGroceryProducts = (products, searchText, category) => {
    const query = searchText.trim().toLowerCase();

    return products.filter((product) => {
        const inCategory = category === 'All' || product.category === category;
        const inSearch =
            !query ||
            `${product.name} ${product.category} ${product.unit}`.toLowerCase().includes(query);
        return inCategory && inSearch;
    });
};
