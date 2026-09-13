import { useCart } from '../CartProvider';

const GroceryProductCard = ({ product, storeName }) => {
    const { addItem } = useCart();

    return (
        <article className="grocery-product-card">
            <div className="grocery-product-emoji" aria-hidden="true">
                {product.emoji}
            </div>
            <h3>{product.name}</h3>
            <p className="grocery-product-unit">{product.unit}</p>
            <p className="grocery-product-price">₹{product.price}</p>
            <button
                className="add-to-cart-btn"
                type="button"
                onClick={() =>
                    addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        isVeg: true,
                        restaurantName: storeName,
                        storeName,
                        vertical: 'grocery',
                        unit: product.unit,
                        emoji: product.emoji,
                    })
                }
            >
                Add
            </button>
        </article>
    );
};

export default GroceryProductCard;
