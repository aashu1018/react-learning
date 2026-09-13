const isRecommendedSection = (title = '') => /recommend/i.test(title);

const matchesQuery = (item, query) => {
    if (!query) {
        return true;
    }

    const haystack = `${item.name} ${item.description || ''}`.toLowerCase();
    return haystack.includes(query);
};

export const sortBestsellersFirst = (items = []) =>
    [...items].sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)));

export const filterMenuSections = (sections = [], { vegOnly = false, query = '' } = {}) => {
    const needle = query.trim().toLowerCase();

    return sections
        .map((section) => ({
            ...section,
            items: sortBestsellersFirst(
                section.items.filter((item) => {
                    if (vegOnly && !item.isVeg) {
                        return false;
                    }
                    return matchesQuery(item, needle);
                })
            ),
        }))
        .filter((section) => section.items.length);
};

export const splitRecommendedSections = (sections = []) => ({
    recommended: sections.filter((section) => isRecommendedSection(section.title)),
    otherSections: sections.filter((section) => !isRecommendedSection(section.title)),
});

export const withBestsellersSection = (sections = []) => {
    const seen = new Set();
    const bestsellers = [];

    sections.forEach((section) => {
        section.items.forEach((item) => {
            const key = item.id ?? item.name;
            if (item.isBestseller && !seen.has(key)) {
                seen.add(key);
                bestsellers.push(item);
            }
        });
    });

    if (bestsellers.length < 2) {
        return sections;
    }

    return [{ title: 'Bestsellers', items: bestsellers }, ...sections];
};
