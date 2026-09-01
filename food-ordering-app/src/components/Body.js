import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import mockRestaurants from '../assets/MockData';

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

const loadRestaurantList = async (url) => {
    try {
        const response = await fetch(url);
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

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        setLoading(true);
        setStatus('');

        const mapped = await loadRestaurantList(LIST_URL);

        if (mapped.length) {
            setAllRestaurants(mapped);
            setListOfRestaurants(mapped);
            setStatus(`Loaded ${mapped.length} restaurants from API`);
        } else {
            setAllRestaurants(mockRestaurants);
            setListOfRestaurants(mockRestaurants);
            setStatus('API did not return JSON (CORS or Cloudflare). Showing mock data.');
        }

        setLoading(false);
    };

    const filterBySearch = () => {
        const query = searchText.toLowerCase().trim();
        const filtered = allRestaurants.filter((restaurant) => {
            const inName = restaurant.name.toLowerCase().includes(query);
            const inCuisines = restaurant.cuisines.some((cuisine) =>
                cuisine.toLowerCase().includes(query)
            );
            const inDishes = (restaurant.dishes || []).some((dish) =>
                dish.toLowerCase().includes(query)
            );
            return inName || inCuisines || inDishes;
        });
        setListOfRestaurants(filtered);
    };

    const filterTopRated = () => {
        setListOfRestaurants(allRestaurants.filter((restaurant) => Number(restaurant.rating) >= 4.3));
    };

    const filterFastDelivery = () => {
        setListOfRestaurants(allRestaurants.filter((restaurant) => restaurant.deliveryTime <= 25));
    };

    const resetFilters = () => {
        setSearchText('');
        setListOfRestaurants(allRestaurants);
    };

    return (
        <div className="body">
            <div className="filter-bar">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search restaurants or dishes"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                filterBySearch();
                            }
                        }}
                    />
                    <button className="search-btn" type="button" onClick={filterBySearch}>
                        Search
                    </button>
                </div>
                <div className="filter-btns">
                    <button type="button" onClick={filterTopRated}>
                        Top Rated
                    </button>
                    <button type="button" onClick={filterFastDelivery}>
                        Fast Delivery
                    </button>
                    <button type="button" onClick={resetFilters}>
                        Show All
                    </button>
                </div>
            </div>
            {status ? <p className="api-status">{status}</p> : null}
            {loading ? (
                <h2>Loading restaurants...</h2>
            ) : (
                <div className="res-container">
                    {listOfRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Body;
