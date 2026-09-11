import { useState } from 'react';

const LoginButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <button
            className="login-btn"
            type="button"
            onClick={() => setIsLoggedIn((prev) => !prev)}
        >
            {isLoggedIn ? 'Logout' : 'Login'}
        </button>
    );
};

export default LoginButton;
