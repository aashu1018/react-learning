import { formatCostForTwo } from '../../utils/formatters';

const MenuHeader = ({ info, preview }) => {
    const cuisines = Array.isArray(info.cuisines) ? info.cuisines.join(', ') : '';
    const rating = info.avgRating ?? info.avgRatingString ?? preview?.rating;
    const deliveryTime = info.sla?.deliveryTime ?? preview?.deliveryTime;
    const cost = formatCostForTwo(info);

    return (
        <div className="menu-header">
            <div>
                <p className="page-kicker">Restaurant</p>
                <h1>{info.name || preview?.name || 'Restaurant'}</h1>
                {cuisines ? <p className="menu-cuisines">{cuisines}</p> : null}
                <p className="menu-meta">
                    {rating ? <span>{rating} ★</span> : null}
                    {deliveryTime ? <span>{deliveryTime} mins</span> : null}
                    {cost ? <span>{cost}</span> : null}
                </p>
                {(info.locality || info.areaName) && (
                    <p className="menu-area">
                        {[info.locality, info.areaName].filter(Boolean).join(', ')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MenuHeader;
