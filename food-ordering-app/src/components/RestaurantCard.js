const RestaurantCard = ({ restaurant }) => {
    const { name, cuisines, dishes, costForTwo, rating, deliveryTime, image } = restaurant;

    return (
        <div className="res-card">
            <div className="res-img-wrap">
                <img className="res-logo" src={image} alt={name} />
                <span className="res-rating">{rating} ★</span>
            </div>
            <div className="res-card-body">
                <h3 className="res-name">{name}</h3>
                <p className="res-cuisines">{cuisines.join(', ')}</p>
                <ul className="res-dishes">
                    {dishes.map((dish) => (
                        <li key={dish}>{dish}</li>
                    ))}
                </ul>
                <div className="res-meta">
                    <span>₹{costForTwo} for two</span>
                    <span>{deliveryTime} mins</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;