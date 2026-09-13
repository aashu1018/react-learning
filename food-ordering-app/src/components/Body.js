import { Link } from 'react-router-dom';
import Shimmer from './Shimmer';
import RestaurantFilterBar from './RestaurantFilterBar';
import CuisineChips from './CuisineChips';
import RestaurantList from './RestaurantList';
import useRestaurants from '../hooks/useRestaurants';

const Body = () => {
    const {
        listOfRestaurants,
        searchText,
        setSearchText,
        filter,
        cuisine,
        setCuisine,
        vegOnly,
        setVegOnly,
        cuisines,
        loading,
        status,
        showTopRated,
        showFastDelivery,
        showAll,
    } = useRestaurants();

    return (
        <div className="body">
            <Link className="grocery-promo" to="/grocery">
                <span className="grocery-promo-copy">
                    <strong>Need groceries?</strong>
                    Milk, veggies, and snacks in as little as 10 minutes.
                </span>
                <span className="grocery-promo-cta">Open Grocery</span>
            </Link>
            <RestaurantFilterBar
                searchText={searchText}
                onSearchTextChange={setSearchText}
                activeFilter={filter}
                onTopRated={showTopRated}
                onFastDelivery={showFastDelivery}
                onShowAll={showAll}
                vegOnly={vegOnly}
                onVegOnly={setVegOnly}
            />
            <CuisineChips cuisines={cuisines} activeCuisine={cuisine} onSelect={setCuisine} />
            {status ? <p className="api-status">{status}</p> : null}
            {loading ? (
                <Shimmer />
            ) : listOfRestaurants.length ? (
                <RestaurantList restaurants={listOfRestaurants} />
            ) : (
                <p className="empty-copy">No restaurants match that search.</p>
            )}
        </div>
    );
};

export default Body;
