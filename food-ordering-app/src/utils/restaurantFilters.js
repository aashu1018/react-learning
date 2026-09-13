export const filterBySearch = (restaurants, searchText) => {
    const query = searchText.toLowerCase().trim();
    if (!query) {
        return restaurants;
    }

    return restaurants.filter((restaurant) => {
        const inName = restaurant.name.toLowerCase().includes(query);
        const inCuisines = restaurant.cuisines.some((cuisine) =>
            cuisine.toLowerCase().includes(query)
        );
        const inDishes = (restaurant.dishes || []).some((dish) =>
            dish.toLowerCase().includes(query)
        );
        return inName || inCuisines || inDishes;
    });
};

export const filterTopRated = (restaurants, minRating = 4.3) =>
    restaurants.filter((restaurant) => Number(restaurant.rating) >= minRating);

export const filterFastDelivery = (restaurants, maxMinutes = 25) =>
    restaurants.filter((restaurant) => restaurant.deliveryTime <= maxMinutes);

export const filterVegRestaurants = (restaurants) =>
    restaurants.filter((restaurant) => restaurant.isVeg);

export const filterByCuisine = (restaurants, cuisine) => {
    if (!cuisine) {
        return restaurants;
    }

    return restaurants.filter((restaurant) =>
        restaurant.cuisines.some((entry) => entry.toLowerCase() === cuisine.toLowerCase())
    );
};

export const popularCuisines = (restaurants, limit = 8) => {
    const counts = new Map();

    restaurants.forEach((restaurant) => {
        restaurant.cuisines.forEach((cuisine) => {
            const name = String(cuisine || '').trim();
            if (!name) {
                return;
            }
            counts.set(name, (counts.get(name) || 0) + 1);
        });
    });

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, limit)
        .map(([name]) => name);
};
