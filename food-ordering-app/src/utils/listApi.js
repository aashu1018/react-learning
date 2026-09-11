import { restaurantListUrls } from '../constants/swiggy';
import { fetchJson } from './fetchJson';
import { mapApiRestaurant, pickRestaurantsFromListPayload } from './restaurantMapper';
import { getCachedRestaurantList, setCachedRestaurantList } from './cache';

export const loadRestaurantList = async ({ force = false } = {}) => {
    if (!force) {
        const cached = getCachedRestaurantList();
        if (cached?.length) {
            return cached;
        }
    }

    for (const url of restaurantListUrls()) {
        const json = await fetchJson(url);
        if (!json) {
            continue;
        }
        const mapped = pickRestaurantsFromListPayload(json)
            .map(mapApiRestaurant)
            .filter((restaurant) => restaurant.name);
        if (mapped.length) {
            setCachedRestaurantList(mapped);
            return mapped;
        }
    }

    return [];
};
