import { SWIGGY_CDN } from '../constants/swiggy';

export const mapApiRestaurant = (item, index) => {
    const info = item.info || item;
    return {
        id: info.id ?? String(index),
        name: info.name,
        cuisines: info.cuisines || [],
        dishes: [...new Set([info.locality, info.areaName].filter(Boolean))],
        costForTwo: info.costForTwoMessage || info.costForTwo,
        rating: info.avgRating ?? info.avgRatingString,
        deliveryTime: info.sla?.deliveryTime,
        isVeg: Boolean(info.veg),
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
