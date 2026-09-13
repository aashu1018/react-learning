import { Link } from 'react-router-dom';
import Shimmer from './Shimmer';
import RestaurantFilterBar from './RestaurantFilterBar';
import RestaurantList from './RestaurantList';
import useRestaurants from '../hooks/useRestaurants';

const Body = () => {
    const {
        listOfRestaurants,
        searchText,
        setSearchText,
        loading,
        status,
        search,
        showTopRated,
        showFastDelivery,
        showAll,
    } = useRestaurants();

    return (
        <div className="body">
            <Link className="grocery-promo" to="/grocery">
                <span className="grocery-promo-emoji" aria-hidden="true">
                    🛒
                </span>
                <span className="grocery-promo-copy">
                    <strong>Grocery delivery</strong>
                    Milk, veggies, and snacks in as little as 10 minutes.
                </span>
                <span className="grocery-promo-cta">Open Grocery</span>
            </Link>
            <RestaurantFilterBar
                searchText={searchText}
                onSearchTextChange={setSearchText}
                onSearch={search}
                onTopRated={showTopRated}
                onFastDelivery={showFastDelivery}
                onShowAll={showAll}
            />
            {status ? <p className="api-status">{status}</p> : null}
            {loading ? <Shimmer /> : <RestaurantList restaurants={listOfRestaurants} />}
        </div>
    );
};

export default Body;
