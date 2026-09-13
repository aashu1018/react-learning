import { useCart } from './CartProvider';

const CartReplaceDialog = () => {
    const { pendingItem, confirmReplace, cancelReplace, items } = useCart();

    if (!pendingItem) {
        return null;
    }

    const currentVertical = items[0]?.vertical === 'grocery' ? 'grocery' : 'food';
    const nextVertical = pendingItem.vertical === 'grocery' ? 'grocery' : 'food';

    return (
        <div className="cart-dialog-backdrop" role="presentation">
            <div className="cart-dialog" role="dialog" aria-modal="true" aria-labelledby="cart-replace-title">
                <h2 id="cart-replace-title">Replace your cart?</h2>
                <p>
                    Your cart has {currentVertical} items. Adding {nextVertical} will clear
                    the current cart.
                </p>
                <div className="cart-dialog-actions">
                    <button type="button" className="ghost-btn" onClick={cancelReplace}>
                        Keep current cart
                    </button>
                    <button type="button" className="search-btn" onClick={confirmReplace}>
                        Replace and add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartReplaceDialog;
