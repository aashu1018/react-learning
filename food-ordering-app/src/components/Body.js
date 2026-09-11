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
