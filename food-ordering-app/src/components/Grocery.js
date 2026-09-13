import { Link } from 'react-router-dom';
import GroceryStoreCard from './grocery/GroceryStoreCard';
import RestaurantFilterBar from './RestaurantFilterBar';
import useGroceryStores from '../hooks/useGroceryStores';

const Grocery = () => {
    const {
        stores,
        searchText,
        setSearchText,
        status,
        search,
        showTopRated,
        showFastDelivery,
        showAll,
    } = useGroceryStores();

    return (
        <div className="body">
            <div className="grocery-hero">
                <p className="page-kicker">Grocery</p>
                <h1>Groceries in minutes</h1>
                <p>
                    Milk, veggies, snacks, and household essentials from nearby stores.
                    Food orders stay on Home.
                </p>
                <Link className="menu-back" to="/">
                    ← Back to restaurants
                </Link>
            </div>
            <RestaurantFilterBar
                searchText={searchText}
                onSearchTextChange={setSearchText}
                onSearch={search}
                onTopRated={showTopRated}
                onFastDelivery={showFastDelivery}
                onShowAll={showAll}
                searchPlaceholder="Search grocery stores"
            />
            {status ? <p className="api-status">{status}</p> : null}
            {stores.length ? (
                <div className="res-container">
                    {stores.map((store) => (
                        <GroceryStoreCard key={store.id} store={store} />
                    ))}
                </div>
            ) : (
                <p>No grocery stores match that search.</p>
            )}
        </div>
    );
};

export default Grocery;
