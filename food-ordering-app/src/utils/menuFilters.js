const isRecommendedSection = (title = '') => /recommend/i.test(title);

export const filterMenuSections = (sections = [], { vegOnly = false } = {}) =>
    sections
        .map((section) => ({
            ...section,
            items: vegOnly ? section.items.filter((item) => item.isVeg) : section.items,
        }))
        .filter((section) => section.items.length);

export const splitRecommendedSections = (sections = []) => ({
    recommended: sections.filter((section) => isRecommendedSection(section.title)),
    otherSections: sections.filter((section) => !isRecommendedSection(section.title)),
});
