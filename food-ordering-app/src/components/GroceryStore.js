import { Link, useParams } from 'react-router-dom';
import GroceryProductCard from './grocery/GroceryProductCard';
import useGroceryStore from '../hooks/useGroceryStore';

const GroceryStore = () => {
    const { storeName } = useParams();
    const { store, products, categories, searchText, setSearchText, category, setCategory } =
        useGroceryStore(storeName);

    if (!store) {
        return (
            <div className="page">
                <h1>Store not found</h1>
                <p>That grocery store is not on the list.</p>
                <Link className="menu-back" to="/grocery">
                    ← Back to grocery
                </Link>
            </div>
        );
    }

    return (
        <div className="menu-page grocery-store-page">
            <Link className="menu-back" to="/grocery">
                ← Back to grocery stores
            </Link>
            <header className="grocery-store-header">
                <span className="grocery-store-header-emoji" aria-hidden="true">
                    {store.emoji}
                </span>
                <div>
                    <p className="page-kicker">Grocery</p>
                    <h1>{store.name}</h1>
                    <p className="menu-area">
                        {store.area} · {store.deliveryTime} mins · {store.rating} ★
                    </p>
                    <p className="menu-cuisines">{store.tagline}</p>
                </div>
            </header>

            <div className="filter-bar grocery-store-tools">
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search products"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </div>
            </div>

            <div className="grocery-categories">
                {categories.map((name) => (
                    <button
                        key={name}
                        type="button"
                        className={category === name ? 'is-active' : ''}
                        onClick={() => setCategory(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {products.length ? (
                <div className="grocery-product-grid">
                    {products.map((product) => (
                        <GroceryProductCard
                            key={product.id}
                            product={product}
                            storeName={store.name}
                        />
                    ))}
                </div>
            ) : (
                <p>No products match that search.</p>
            )}
        </div>
    );
};

export default GroceryStore;
