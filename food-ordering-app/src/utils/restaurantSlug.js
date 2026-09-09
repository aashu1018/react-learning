export const restaurantSlug = (name) =>
    String(name || '')
        .toLowerCase()
        .normalize('NFKD')
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const findRestaurantBySlug = (restaurants, slug) =>
    restaurants.find((restaurant) => restaurantSlug(restaurant.name) === slug);
