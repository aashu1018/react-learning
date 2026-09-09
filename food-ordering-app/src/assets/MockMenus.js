import mockRestaurants from './MockData';

const buildSections = (restaurant) => {
    const basePrice = Math.round(Number(restaurant.costForTwo) / 4) || 120;
    const recommended = (restaurant.dishes || []).map((name, index) => ({
        id: `${restaurant.id}-rec-${index}`,
        name,
        description: `Recommended from ${restaurant.name}`,
        price: basePrice + index * 30,
        isVeg: index % 2 === 0,
        isBestseller: index === 0,
    }));

    const moreItems = [
        {
            id: `${restaurant.id}-extra-1`,
            name: 'Veg Combo',
            description: 'Light veg plate with sides',
            price: basePrice - 20,
            isVeg: true,
        },
        {
            id: `${restaurant.id}-extra-2`,
            name: 'Chicken Special',
            description: 'Chef special non-veg plate',
            price: basePrice + 80,
            isVeg: false,
            isBestseller: true,
        },
        {
            id: `${restaurant.id}-extra-3`,
            name: 'Soft Drink',
            description: 'Chilled beverage',
            price: 60,
            isVeg: true,
        },
    ];

    return [
        { title: 'Recommended', items: recommended },
        { title: 'More from the kitchen', items: moreItems },
    ];
};

const mockMenusById = Object.fromEntries(
    mockRestaurants.map((restaurant) => [
        String(restaurant.id),
        {
            info: {
                id: restaurant.id,
                name: restaurant.name,
                cuisines: restaurant.cuisines,
                avgRating: restaurant.rating,
                costForTwoMessage:
                    typeof restaurant.costForTwo === 'number'
                        ? `₹${restaurant.costForTwo} for two`
                        : restaurant.costForTwo,
                sla: { deliveryTime: restaurant.deliveryTime },
                locality: restaurant.dishes?.[0],
                areaName: restaurant.dishes?.[1],
            },
            sections: buildSections(restaurant),
            source: 'mock',
        },
    ])
);

export default mockMenusById;
