const mapMenuItem = (item) => {
    const info = item?.card?.info || item?.info || {};
    const pricePaise = info.price ?? info.defaultPrice ?? info.finalPrice ?? 0;
    return {
        id: info.id,
        name: info.name,
        description: info.description || '',
        price: pricePaise / 100,
        isVeg: info.isVeg === 1 || info.itemAttribute?.vegClassifier === 'VEG',
        isBestseller: Boolean(
            info.isBestseller || info.ribbon?.text?.toLowerCase().includes('best')
        ),
        rating: info.ratings?.aggregatedRating?.rating,
        imageId: info.imageId,
    };
};

const sectionFromCard = (section) => {
    if (!section) {
        return null;
    }

    if (Array.isArray(section.itemCards) && section.itemCards.length) {
        return {
            title: section.title || 'Menu',
            items: section.itemCards.map(mapMenuItem).filter((item) => item.name),
        };
    }

    if (Array.isArray(section.categories) && section.categories.length) {
        const items = section.categories.flatMap((category) =>
            (category.itemCards || []).map(mapMenuItem)
        );
        return {
            title: section.title || 'Menu',
            items: items.filter((item) => item.name),
        };
    }

    return null;
};

export const pickRestaurantInfo = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
        const info = card?.card?.card?.info;
        if (info?.id && info?.name) {
            return info;
        }
    }
    return null;
};

export const pickMenuSections = (json) => {
    const cards = json?.data?.cards || [];
    for (const card of cards) {
        const regularCards = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        if (!Array.isArray(regularCards)) {
            continue;
        }

        return regularCards
            .map((entry) => sectionFromCard(entry?.card?.card))
            .filter((section) => section?.items?.length);
    }
    return [];
};

export const parseMenuPayload = (json) => {
    const info = pickRestaurantInfo(json);
    const sections = pickMenuSections(json);
    if (!info && !sections.length) {
        return null;
    }
    return { info, sections };
};
