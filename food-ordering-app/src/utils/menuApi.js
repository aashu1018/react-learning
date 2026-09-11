import { restaurantMenuUrls } from '../constants/swiggy';
import { fetchJson } from './fetchJson';
import { parseMenuPayload } from './menuMapper';
import { getCachedMenu, setCachedMenu } from './cache';

export { MENU_IMAGE_URL } from '../constants/swiggy';

export const loadRestaurantMenu = async (restaurantId, { force = false } = {}) => {
    if (restaurantId == null) {
        return null;
    }

    if (!force) {
        const cached = getCachedMenu(restaurantId);
        if (cached) {
            return cached;
        }
    }

    for (const url of restaurantMenuUrls(restaurantId)) {
        const json = await fetchJson(url);
        if (!json) {
            continue;
        }
        const payload = parseMenuPayload(json);
        if (payload) {
            const menu = {
                ...payload,
                source: 'swiggy-proxy',
            };
            setCachedMenu(restaurantId, menu);
            return menu;
        }
    }

    return null;
};
