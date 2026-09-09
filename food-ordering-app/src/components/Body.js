import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import mockRestaurants from '../assets/MockData';
import { loadRestaurantList } from '../utils/listApi';

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

        const [mapped] = await Promise.all([
            loadRestaurantList(),
            new Promise((resolve) => setTimeout(resolve, 500)),
        ]);

        if (mapped.length) {
            setAllRestaurants(mapped);
            setListOfRestaurants(mapped);
            setStatus(`Loaded ${mapped.length} restaurants from Swiggy`);
        } else {
            setAllRestaurants(mockRestaurants);
            setListOfRestaurants(mockRestaurants);
            setStatus('Swiggy API did not return restaurants. Showing mock data.');
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
                <Shimmer />
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
