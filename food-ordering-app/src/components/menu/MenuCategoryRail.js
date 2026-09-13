const MenuCategoryRail = ({ sections, activeId, onSelect }) => {
    if (sections.length < 2) {
        return null;
    }

    return (
        <nav className="menu-cat-rail" aria-label="Menu categories">
            {sections.map((section) => (
                <button
                    key={section.id}
                    type="button"
                    className={activeId === section.id ? 'is-active' : ''}
                    onClick={() => onSelect(section.id)}
                >
                    {section.title}
                </button>
            ))}
        </nav>
    );
};

export default MenuCategoryRail;
