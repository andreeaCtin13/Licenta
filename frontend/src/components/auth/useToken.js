// components/auth/useToken.js
import { useState } from 'react';

// Function to get the token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
}

export default function useToken() {
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = userToken => {
        localStorage.setItem('token', userToken.token);
        localStorage.setItem('user', JSON.stringify(userToken.user));
        setToken(userToken.token);
        setUser(userToken.user);
    };

    const clearToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return {
        setToken: saveToken,
        token,
        user,
        clearToken,
    };
}
