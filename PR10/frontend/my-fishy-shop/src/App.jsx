import React, { useState, useEffect } from 'react';
import ProductManager from './components/ProductManager/ProductManager';
import Auth from './components/Auth/Auth';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <Auth onLogin={handleLogin} />;
    }

    return <ProductManager onLogout={handleLogout} />;
}

export default App;