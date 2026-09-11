import mockRestaurants from '../assets/MockData';
import { loadRestaurantList } from './listApi';
import { restaurantSlug } from './restaurantSlug';
import {
    getCachedRestaurantBySlug,
    getCachedRestaurantList,
    setCachedRestaurantBySlug,
} from './cache';

const matchesSlug = (restaurant, slug) => restaurantSlug(restaurant.name) === slug;

export const resolveRestaurantBySlug = async (slug, preview) => {
    if (preview && matchesSlug(preview, slug)) {
        setCachedRestaurantBySlug(slug, preview);
        return preview;
    }

    const cachedBySlug = getCachedRestaurantBySlug(slug);
    if (cachedBySlug) {
        return cachedBySlug;
    }

    const cachedList = getCachedRestaurantList();
    if (cachedList?.length) {
        const fromCache = cachedList.find((restaurant) => matchesSlug(restaurant, slug));
        if (fromCache) {
            setCachedRestaurantBySlug(slug, fromCache);
            return fromCache;
        }
    }

    const fromApi = await loadRestaurantList();
    const match = fromApi.find((restaurant) => matchesSlug(restaurant, slug));
    if (match) {
        setCachedRestaurantBySlug(slug, match);
        return match;
    }

    const fromMock = mockRestaurants.find((restaurant) => matchesSlug(restaurant, slug)) || null;
    if (fromMock) {
        setCachedRestaurantBySlug(slug, fromMock);
    }
    return fromMock;
};
