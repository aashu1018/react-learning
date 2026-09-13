import GroceryStoreCard from './grocery/GroceryStoreCard';
import RestaurantFilterBar from './RestaurantFilterBar';
import useGroceryStores from '../hooks/useGroceryStores';

const Grocery = () => {
    const {
        stores,
        searchText,
        setSearchText,
        filter,
        showTopRated,
        showFastDelivery,
        showAll,
    } = useGroceryStores();

    return (
        <div className="body">
            <div className="grocery-hero">
                <p className="page-kicker">Grocery</p>
                <h1>Groceries in minutes</h1>
                <p>Milk, veggies, snacks, and household essentials from nearby stores.</p>
            </div>
            <RestaurantFilterBar
                searchText={searchText}
                onSearchTextChange={setSearchText}
                activeFilter={filter}
                onTopRated={showTopRated}
                onFastDelivery={showFastDelivery}
                onShowAll={showAll}
                searchPlaceholder="Search grocery stores"
            />
            {stores.length ? (
                <div className="res-container">
                    {stores.map((store) => (
                        <GroceryStoreCard key={store.id} store={store} />
                    ))}
                </div>
            ) : (
                <p className="empty-copy">No grocery stores match that search.</p>
            )}
        </div>
    );
};

export default Grocery;
