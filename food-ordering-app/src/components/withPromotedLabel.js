const withPromotedLabel = (WrappedComponent) => {
    const WithPromotedLabel = (props) => (
        <div className="promoted-wrap">
            <span className="promoted-label">Promoted</span>
            <WrappedComponent {...props} />
        </div>
    );

    return WithPromotedLabel;
};

export default withPromotedLabel;
