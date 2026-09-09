const MENU_URL = (id) => `https://namastedev.com/api/v1/listRestaurantMenu/${id}`;
const SWIGGY_MENU_URL = (id) =>
    `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`;

export const MENU_IMAGE_URL =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_200,c_fit/';

const isJsonResponse = (response) => {
    const contentType = response.headers.get('content-type') || '';
    return response.ok && contentType.includes('json');
};

const pickRestaurantInfo = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
        const info = card?.card?.card?.info;
        if (info?.id && info?.name) {
            return info;
        }
    }
    return null;
};

const mapMenuItem = (item) => {
    const info = item?.card?.info || item?.info || {};
    const pricePaise = info.price ?? info.defaultPrice ?? info.finalPrice ?? 0;
    return {
        id: info.id,
        name: info.name,
        description: info.description || '',
        price: pricePaise / 100,
        isVeg: info.isVeg === 1 || info.itemAttribute?.vegClassifier === 'VEG',
        imageId: info.imageId,
    };
};

const pickMenuSections = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
        const regularCards = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        if (!Array.isArray(regularCards)) {
            continue;
        }

        return regularCards
            .map((entry) => entry?.card?.card)
            .filter((section) => Array.isArray(section?.itemCards) && section.itemCards.length)
            .map((section) => ({
                title: section.title || 'Menu',
                items: section.itemCards.map(mapMenuItem).filter((item) => item.name),
            }))
            .filter((section) => section.items.length);
    }
    return [];
};

const parseMenuPayload = (json) => {
    const info = pickRestaurantInfo(json);
    const sections = pickMenuSections(json);
    if (!info && !sections.length) {
        return null;
    }
    return { info, sections };
};

const loadJson = async (url) => {
    try {
        const response = await fetch(url);
        if (!isJsonResponse(response)) {
            return null;
        }
        return response.json();
    } catch {
        return null;
    }
};

export const loadRestaurantMenu = async (restaurantId) => {
    const json =
        (await loadJson(MENU_URL(restaurantId))) ||
        (await loadJson(SWIGGY_MENU_URL(restaurantId)));
    return json ? parseMenuPayload(json) : null;
};
