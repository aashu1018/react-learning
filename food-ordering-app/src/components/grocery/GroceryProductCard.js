import QtyControl from '../QtyControl';

const GroceryProductCard = ({ product, storeName }) => (
    <article className="grocery-product-card">
        <div className="grocery-product-emoji" aria-hidden="true">
            {product.emoji}
        </div>
        <div className="grocery-product-body">
            <h3>{product.name}</h3>
            <p className="grocery-product-unit">{product.unit}</p>
            <p className="grocery-product-price">₹{product.price}</p>
            <QtyControl
                payload={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    isVeg: true,
                    restaurantName: storeName,
                    storeName,
                    vertical: 'grocery',
                    unit: product.unit,
                    emoji: product.emoji,
                }}
            />
        </div>
    </article>
);

export default GroceryProductCard;
