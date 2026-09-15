import MenuItem from './MenuItem';

const MenuSection = ({ section, restaurantName, isOpen, onToggle }) => (
    <section className="menu-section" id={section.id}>
        <button
            type="button"
            className="menu-section-header"
            onClick={onToggle}
            aria-expanded={isOpen}
        >
            <h2>
                {section.title} ({section.items.length})
            </h2>
            <span className={`menu-section-chevron${isOpen ? ' is-open' : ''}`} aria-hidden="true">
                ⌄
            </span>
        </button>
        {isOpen ? (
            <ul className="menu-list">
                {section.items.map((item, index) => (
                    <MenuItem
                        key={item.id ?? `${section.title}-${index}`}
                        item={item}
                        restaurantName={restaurantName}
                    />
                ))}
            </ul>
        ) : null}
    </section>
);

export default MenuSection;
