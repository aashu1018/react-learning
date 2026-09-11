let restaurantListCache = null;
const restaurantBySlugCache = new Map();
const menuByIdCache = new Map();

export const getCachedRestaurantList = () => restaurantListCache;

export const setCachedRestaurantList = (restaurants) => {
    restaurantListCache = restaurants;
    restaurantBySlugCache.clear();
};

export const getCachedRestaurantBySlug = (slug) => restaurantBySlugCache.get(slug);

export const setCachedRestaurantBySlug = (slug, restaurant) => {
    if (slug && restaurant) {
        restaurantBySlugCache.set(slug, restaurant);
    }
};

export const getCachedMenu = (restaurantId) => menuByIdCache.get(String(restaurantId));

export const setCachedMenu = (restaurantId, menu) => {
    if (restaurantId != null && menu) {
        menuByIdCache.set(String(restaurantId), menu);
    }
};
