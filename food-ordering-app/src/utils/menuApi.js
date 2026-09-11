import { restaurantMenuUrls } from '../constants/swiggy';
import { fetchJson } from './fetchJson';
import { parseMenuPayload } from './menuMapper';

export { MENU_IMAGE_URL } from '../constants/swiggy';

export const loadRestaurantMenu = async (restaurantId) => {
    for (const url of restaurantMenuUrls(restaurantId)) {
        const json = await fetchJson(url);
        if (!json) {
            continue;
        }
        const payload = parseMenuPayload(json);
        if (payload) {
            return {
                ...payload,
                source: url.startsWith('/swiggy') ? 'swiggy-proxy' : 'swiggy',
            };
        }
    }
    return null;
};
