import { createContext, useContext, useMemo, useState } from 'react';
import {
    addItemToCart,
    cartTotals,
    removeItemFromCart,
    updateItemQuantity,
} from '../utils/cart';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const value = useMemo(() => {
        const bill = cartTotals(items);

        return {
            items,
            ...bill,
            addItem: (item) => setItems((prev) => addItemToCart(prev, item)),
            increaseItem: (itemId) =>
                setItems((prev) => {
                    const current = prev.find((entry) => entry.id === itemId);
                    return current
                        ? updateItemQuantity(prev, itemId, current.quantity + 1)
                        : prev;
                }),
            decreaseItem: (itemId) =>
                setItems((prev) => {
                    const current = prev.find((entry) => entry.id === itemId);
                    return current
                        ? updateItemQuantity(prev, itemId, current.quantity - 1)
                        : prev;
                }),
            removeItem: (itemId) => setItems((prev) => removeItemFromCart(prev, itemId)),
            clearCart: () => setItems([]),
        };
    }, [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export default CartProvider;
