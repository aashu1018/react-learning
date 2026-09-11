export const SWIGGY_LAT = 12.9351929;
export const SWIGGY_LNG = 77.62448069999999;

export const SWIGGY_CDN =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

export const MENU_IMAGE_URL =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/';

export const PLACEHOLDER_IMAGE = `${SWIGGY_CDN}placeholder`;

export const restaurantListUrls = () => {
    const path = `/dapi/restaurants/list/v5?lat=${SWIGGY_LAT}&lng=${SWIGGY_LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    return [`/swiggy${path}`, `https://www.swiggy.com${path}`];
};

export const restaurantMenuUrls = (restaurantId) => {
    const queries = [
        `/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${SWIGGY_LAT}&lng=${SWIGGY_LNG}&restaurantId=${restaurantId}`,
        `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${SWIGGY_LAT}&lng=${SWIGGY_LNG}&restaurantId=${restaurantId}`,
    ];
    return queries.flatMap((path) => [`/swiggy${path}`, `https://www.swiggy.com${path}`]);
};
