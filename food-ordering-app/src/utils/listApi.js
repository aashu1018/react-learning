import mockRestaurants from '../assets/MockData';
import { restaurantSlug } from './restaurantSlug';

const LIST_URL = 'https://namastedev.com/api/v1/listRestaurants';

const DUMMY_IMAGES = [
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
];

const mapApiRestaurant = (item, index) => {
    const info = item.info || item;
    return {
        id: info.id ?? String(index),
        name: info.name,
        cuisines: info.cuisines || [],
        dishes: [info.locality, info.areaName].filter(Boolean),
        costForTwo: info.costForTwo,
        rating: info.avgRating ?? info.avgRatingString,
        deliveryTime: info.sla?.deliveryTime,
        image: DUMMY_IMAGES[index % DUMMY_IMAGES.length],
    };
};

const pickRestaurants = (json) => {
    const cards = json?.data?.data?.cards || json?.data?.cards || [];
    for (const card of cards) {
        const list = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (Array.isArray(list) && list.length) {
            return list;
        }
    }
    return [];
};

const matchesSlug = (restaurant, slug) => restaurantSlug(restaurant.name) === slug;

export const loadRestaurantList = async () => {
    try {
        const response = await fetch(LIST_URL);
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !contentType.includes('json')) {
            return [];
        }
        const json = await response.json();
        return pickRestaurants(json).map(mapApiRestaurant);
    } catch {
        return [];
    }
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
