const CuisineChips = ({ cuisines, activeCuisine, onSelect }) => {
    if (!cuisines.length) {
        return null;
    }

    return (
        <div className="cuisine-chips" aria-label="Cuisines">
            {cuisines.map((cuisine) => (
                <button
                    key={cuisine}
                    type="button"
                    className={activeCuisine === cuisine ? 'is-active' : ''}
                    onClick={() => onSelect(activeCuisine === cuisine ? '' : cuisine)}
                >
                    {cuisine}
                </button>
            ))}
        </div>
    );
};

export default CuisineChips;
