const RestaurantFilterBar = ({
    searchText,
    onSearchTextChange,
    activeFilter = 'all',
    onTopRated,
    onFastDelivery,
    onShowAll,
    vegOnly = false,
    onVegOnly,
    searchPlaceholder = 'Search restaurants or dishes',
}) => (
    <div className="filter-bar">
        <div className="search">
            <input
                className="search-input"
                type="search"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(event) => onSearchTextChange(event.target.value)}
                aria-label={searchPlaceholder}
            />
        </div>
        <div className="filter-btns">
            <button
                type="button"
                className={activeFilter === 'top' ? 'is-active' : ''}
                onClick={onTopRated}
            >
                Top Rated
            </button>
            <button
                type="button"
                className={activeFilter === 'fast' ? 'is-active' : ''}
                onClick={onFastDelivery}
            >
                Fast Delivery
            </button>
            <button
                type="button"
                className={activeFilter === 'all' ? 'is-active' : ''}
                onClick={onShowAll}
            >
                Show All
            </button>
            {onVegOnly ? (
                <button
                    type="button"
                    className={vegOnly ? 'is-active' : ''}
                    onClick={() => onVegOnly(!vegOnly)}
                >
                    Veg
                </button>
            ) : null}
        </div>
    </div>
);

export default RestaurantFilterBar;
