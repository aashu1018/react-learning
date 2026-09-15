import { useEffect, useState } from 'react';

const FOOD_STAGES = ['Order placed', 'Preparing your food', 'Out for delivery', 'Delivered'];
const GROCERY_STAGES = ['Order placed', 'Packing your order', 'Out for delivery', 'Delivered'];
const STAGE_DURATION_MS = 3200;

const OrderStatusTimeline = ({ isGrocery }) => {
    const stages = isGrocery ? GROCERY_STAGES : FOOD_STAGES;
    const [stageIndex, setStageIndex] = useState(0);

    useEffect(() => {
        if (stageIndex >= stages.length - 1) {
            return undefined;
        }
        const timer = window.setTimeout(() => setStageIndex((index) => index + 1), STAGE_DURATION_MS);
        return () => window.clearTimeout(timer);
    }, [stageIndex, stages.length]);

    return (
        <div className="order-timeline">
            <div className="order-timeline-track">
                <div
                    className="order-timeline-progress"
                    style={{ width: `${(stageIndex / (stages.length - 1)) * 100}%` }}
                />
                {stages.map((label, index) => (
                    <div
                        key={label}
                        className={`order-timeline-step${index <= stageIndex ? ' is-done' : ''}${
                            index === stageIndex && index < stages.length - 1 ? ' is-current' : ''
                        }`}
                    >
                        <span className="order-timeline-dot" aria-hidden="true" />
                        <span className="order-timeline-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusTimeline;
