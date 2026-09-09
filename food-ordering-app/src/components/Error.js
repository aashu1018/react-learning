import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    const status = error?.status || 404;
    const message = error?.statusText || error?.message || 'Page not found';

    return (
        <div className="page">
            <h1>Oops!</h1>
            <p>
                {status}: {message}
            </p>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default Error;
