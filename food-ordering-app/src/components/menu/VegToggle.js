const VegToggle = ({ checked, onChange }) => (
    <div className="menu-toolbar">
        <label className="veg-toggle">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
            />
            <span>Veg only</span>
        </label>
    </div>
);

export default VegToggle;
