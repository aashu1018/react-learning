import mockRestaurants from '../assets/MockData';
import { restaurantSlug } from './restaurantSlug';

const LAT = 12.9351929;
const LNG = 77.62448069999999;

const SWIGGY_LIST_PATH = `/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
const SWIGGY_CDN =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

const LIST_CANDIDATE_URLS = [
    `/swiggy${SWIGGY_LIST_PATH}`,
    `https://www.swiggy.com${SWIGGY_LIST_PATH}`,
];

const mapApiRestaurant = (item, index) => {
    const info = item.info || item;
    return {
        id: info.id ?? String(index),
        name: info.name,
        cuisines: info.cuisines || [],
        dishes: [...new Set([info.locality, info.areaName].filter(Boolean))],
        costForTwo: info.costForTwoMessage || info.costForTwo,
        rating: info.avgRating ?? info.avgRatingString,
        deliveryTime: info.sla?.deliveryTime,
        image: info.cloudinaryImageId
            ? `${SWIGGY_CDN}${info.cloudinaryImageId}`
            : undefined,
    };
};

// Swiggy sends restaurants across multiple cards (top chains + main grid).
// Collect all of them and keep unique ids.
const pickRestaurants = (json) => {
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

const loadJson = async (url) => {
    try {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !contentType.includes('json')) {
            return null;
        }
        return response.json();
    } catch {
        return null;
    }
};

const matchesSlug = (restaurant, slug) => restaurantSlug(restaurant.name) === slug;

export const loadRestaurantList = async () => {
    for (const url of LIST_CANDIDATE_URLS) {
        const json = await loadJson(url);
        if (!json) {
            continue;
        }
        const mapped = pickRestaurants(json).map(mapApiRestaurant).filter((r) => r.name);
        if (mapped.length) {
            return mapped;
        }
    }
    return [];
};

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
