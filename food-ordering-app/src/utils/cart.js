const GST_RATE = 0.05;
const PLATFORM_FEE = 5;
const FREE_DELIVERY_ABOVE = 199;
const DELIVERY_FEE = 40;

export const cartTotals = (items = []) => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = itemTotal === 0 || itemTotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    const platformFee = itemTotal > 0 ? PLATFORM_FEE : 0;
    const taxable = itemTotal + deliveryFee + platformFee;
    const gst = Math.round(taxable * GST_RATE);
    const grandTotal = Math.round(itemTotal + deliveryFee + platformFee + gst);

    return {
        itemCount,
        itemTotal: Math.round(itemTotal),
        deliveryFee,
        platformFee,
        gst,
        gstRatePercent: GST_RATE * 100,
        grandTotal,
        // keep older name used around the app
        totalPrice: grandTotal,
    };
};

const itemVertical = (item) => item.vertical || 'food';

export const addItemToCart = (items, item) => {
    const vertical = itemVertical(item);
    const scopedItems =
        items.length && itemVertical(items[0]) !== vertical ? [] : items;
    const existing = scopedItems.find((entry) => entry.id === item.id);
    if (existing) {
        return scopedItems.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
    }

    return [
        ...scopedItems,
        {
            id: item.id,
            name: item.name,
            price: Number(item.price) || 0,
            isVeg: item.isVeg,
            imageId: item.imageId,
            restaurantName: item.restaurantName,
            storeName: item.storeName,
            vertical,
            unit: item.unit,
            emoji: item.emoji,
            quantity: 1,
        },
    ];
};

export const updateItemQuantity = (items, itemId, quantity) => {
    if (quantity <= 0) {
        return items.filter((entry) => entry.id !== itemId);
    }
    return items.map((entry) => (entry.id === itemId ? { ...entry, quantity } : entry));
};

export const removeItemFromCart = (items, itemId) =>
    items.filter((entry) => entry.id !== itemId);
