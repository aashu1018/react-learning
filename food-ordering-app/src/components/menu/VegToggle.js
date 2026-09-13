const VegToggle = ({ checked, onChange, query, onQueryChange, onSearch }) => (
    <div className="menu-toolbar">
        <div className="search">
            <input
                className="search-input"
                type="search"
                placeholder="Search this menu"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onSearch();
                    }
                }}
                aria-label="Search this menu"
            />
            <button className="search-btn" type="button" onClick={onSearch}>
                Search
            </button>
        </div>
        <label className="veg-toggle">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
            />
            <span>Veg only</span>
        </label>
    </div>
);

export default VegToggle;
