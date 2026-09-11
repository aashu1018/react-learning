import mockRestaurants from '../assets/MockData';
import { loadRestaurantList } from './listApi';
import { restaurantSlug } from './restaurantSlug';

const matchesSlug = (restaurant, slug) => restaurantSlug(restaurant.name) === slug;

export const resolveRestaurantBySlug = async (slug, preview) => {
    if (preview && matchesSlug(preview, slug)) {
        return preview;
    }

    const fromApi = await loadRestaurantList();
    const match = fromApi.find((restaurant) => matchesSlug(restaurant, slug));
    if (match) {
        return match;
    }

    return mockRestaurants.find((restaurant) => matchesSlug(restaurant, slug)) || null;
};
