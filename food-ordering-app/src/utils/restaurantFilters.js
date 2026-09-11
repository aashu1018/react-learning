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
