const RestaurantFilterBar = ({
    searchText,
    onSearchTextChange,
    onSearch,
    onTopRated,
    onFastDelivery,
    onShowAll,
    searchPlaceholder = 'Search restaurants or dishes',
}) => (
    <div className="filter-bar">
        <div className="search">
            <input
                className="search-input"
                type="text"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(event) => onSearchTextChange(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onSearch();
                    }
                }}
            />
            <button className="search-btn" type="button" onClick={onSearch}>
                Search
            </button>
        </div>
        <div className="filter-btns">
            <button type="button" onClick={onTopRated}>
                Top Rated
            </button>
            <button type="button" onClick={onFastDelivery}>
                Fast Delivery
            </button>
            <button type="button" onClick={onShowAll}>
                Show All
            </button>
        </div>
    </div>
);

export default RestaurantFilterBar;
