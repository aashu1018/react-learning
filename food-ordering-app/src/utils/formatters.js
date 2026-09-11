export const formatCostForTwo = (infoOrValue) => {
    if (infoOrValue == null) {
        return '';
    }

    if (typeof infoOrValue === 'object') {
        if (infoOrValue.costForTwoMessage) {
            return infoOrValue.costForTwoMessage;
        }
        if (typeof infoOrValue.costForTwo === 'number') {
            const value = infoOrValue.costForTwo;
            return value > 1000 ? `₹${value / 100} for two` : `₹${value} for two`;
        }
        return typeof infoOrValue.costForTwo === 'string' ? infoOrValue.costForTwo : '';
    }

    if (typeof infoOrValue === 'number') {
        return `₹${infoOrValue} for two`;
    }

    return String(infoOrValue);
};

export const restaurantToMenuInfo = (restaurant, fallbackName) => {
    if (!restaurant) {
        return { name: fallbackName };
    }

    return {
        id: restaurant.id,
        name: restaurant.name,
        cuisines: restaurant.cuisines,
        avgRating: restaurant.rating,
        costForTwoMessage: formatCostForTwo(restaurant.costForTwo),
        sla: { deliveryTime: restaurant.deliveryTime },
    };
};
