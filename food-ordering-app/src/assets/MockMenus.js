import mockRestaurants from './MockData';

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
            sections: [
                {
                    title: 'Popular',
                    items: (restaurant.dishes || []).map((name, index) => ({
                        id: `${restaurant.id}-item-${index}`,
                        name,
                        description: `A favourite from ${restaurant.name}`,
                        price: Math.round(Number(restaurant.costForTwo) / 4) + index * 25,
                        isVeg: index % 2 === 0,
                    })),
                },
            ],
        },
    ])
);

export default mockMenusById;
