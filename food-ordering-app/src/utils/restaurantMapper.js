import { SWIGGY_CDN } from '../constants/swiggy';

const PROMOTED_RATING_THRESHOLD = 4.5;

export const mapApiRestaurant = (item, index) => {
    const info = item.info || item;
    const rating = info.avgRating ?? info.avgRatingString;
    return {
        id: info.id ?? String(index),
        name: info.name,
        cuisines: info.cuisines || [],
        dishes: [...new Set([info.locality, info.areaName].filter(Boolean))],
        costForTwo: info.costForTwoMessage || info.costForTwo,
        rating,
        deliveryTime: info.sla?.deliveryTime,
        isVeg: Boolean(info.veg),
        // Swiggy's public listing feed doesn't reliably carry a `promoted` flag,
        // so treat a genuine flag as authoritative and otherwise fall back to a rating bar.
        promoted: Boolean(info.promoted) || Number(rating) >= PROMOTED_RATING_THRESHOLD,
        image: info.cloudinaryImageId ? `${SWIGGY_CDN}${info.cloudinaryImageId}` : undefined,
    };
};

export const pickRestaurantsFromListPayload = (json) => {
    const cards = json?.data?.cards || [];
    const byId = new Map();

    for (const card of cards) {
        const list = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (!Array.isArray(list)) {
            continue;
        }
        for (const restaurant of list) {
            const id = restaurant?.info?.id ?? restaurant?.id;
            if (id != null && !byId.has(String(id))) {
                byId.set(String(id), restaurant);
            }
        }
    }

    return [...byId.values()];
};
