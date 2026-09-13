const SHIMMER_CARD_COUNT = 8;

const Shimmer = () => (
    <div className="res-container">
        {Array.from({ length: SHIMMER_CARD_COUNT }).map((_, index) => (
            <div key={index} className="shimmer-card">
                <div className="shimmer-img" />
                <div className="shimmer-card-body">
                    <div className="shimmer-line shimmer-line-lg" />
                    <div className="shimmer-line shimmer-line-md" />
                    <div className="shimmer-line shimmer-line-sm" />
                </div>
            </div>
        ))}
    </div>
);

export const PageShimmer = () => (
    <div className="page page-shimmer">
        <div className="shimmer-line shimmer-line-lg" />
        <div className="shimmer-line shimmer-line-md" />
        <div className="shimmer-line shimmer-line-sm" />
        <div className="shimmer-line shimmer-line-md" />
    </div>
);

export default Shimmer;
