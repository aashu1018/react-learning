const SWIGGY_MENU_QUERIES = (id) => [
    `/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`,
    `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${id}`,
];

export const MENU_IMAGE_URL =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/';

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
        isBestseller: Boolean(info.isBestseller || info.ribbon?.text?.toLowerCase().includes('best')),
        rating: info.ratings?.aggregatedRating?.rating,
        imageId: info.imageId,
    };
};

const sectionFromCard = (section) => {
    if (!section) {
        return null;
    }

    if (Array.isArray(section.itemCards) && section.itemCards.length) {
        return {
            title: section.title || 'Menu',
            items: section.itemCards.map(mapMenuItem).filter((item) => item.name),
        };
    }

    // Nested categories (e.g. "Recommended" / combo groups)
    if (Array.isArray(section.categories) && section.categories.length) {
        const items = section.categories.flatMap((category) =>
            (category.itemCards || []).map(mapMenuItem)
        );
        return {
            title: section.title || 'Menu',
            items: items.filter((item) => item.name),
        };
    }

    return null;
};

const pickMenuSections = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
        const regularCards = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        if (!Array.isArray(regularCards)) {
            continue;
        }

        return regularCards
            .map((entry) => sectionFromCard(entry?.card?.card))
            .filter((section) => section?.items?.length);
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

const menuCandidateUrls = (restaurantId) => {
    const swiggyPaths = SWIGGY_MENU_QUERIES(restaurantId);
    return [
        ...swiggyPaths.map((path) => `/swiggy${path}`),
        ...swiggyPaths.map((path) => `https://www.swiggy.com${path}`),
    ];
};

export const loadRestaurantMenu = async (restaurantId) => {
    for (const url of menuCandidateUrls(restaurantId)) {
        const json = await loadJson(url);
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
