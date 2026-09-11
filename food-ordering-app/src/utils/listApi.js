import { restaurantListUrls } from '../constants/swiggy';
import { fetchJson } from './fetchJson';
import { mapApiRestaurant, pickRestaurantsFromListPayload } from './restaurantMapper';

export const loadRestaurantList = async () => {
    for (const url of restaurantListUrls()) {
        const json = await fetchJson(url);
        if (!json) {
            continue;
        }
        const mapped = pickRestaurantsFromListPayload(json)
            .map(mapApiRestaurant)
            .filter((restaurant) => restaurant.name);
        if (mapped.length) {
            return mapped;
        }
    }
    return [];
};
