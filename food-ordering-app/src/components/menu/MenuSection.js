import MenuItem from './MenuItem';

const MenuSection = ({ section, restaurantName }) => (
    <section className="menu-section">
        <h2>
            {section.title} ({section.items.length})
        </h2>
        <ul className="menu-list">
            {section.items.map((item, index) => (
                <MenuItem
                    key={item.id ?? `${section.title}-${index}`}
                    item={item}
                    restaurantName={restaurantName}
                />
            ))}
        </ul>
    </section>
);

export default MenuSection;
