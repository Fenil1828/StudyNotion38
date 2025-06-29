import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useGoogleAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const initiateGoogleLogin = () => {
        setIsLoading(true);
        setError(null);
        
        // Redirect to backend Google OAuth endpoint
        window.location.href = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/google`;
    };

    // Handle OAuth callback
    useEffect(() => {
        const handleOAuthCallback = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const loginStatus = urlParams.get('login');
            const error = urlParams.get('error');

            if (loginStatus === 'success') {
                setIsLoading(false);
                // You might want to fetch user data here or trigger a context update
                navigate('/dashboard');
            } else if (error) {
                setIsLoading(false);
                let errorMessage = 'Authentication failed';
                
                switch (error) {
                    case 'oauth_error':
                        errorMessage = 'Google authentication error occurred';
                        break;
                    case 'oauth_failed':
                        errorMessage = 'Google authentication was cancelled or failed';
                        break;
                    case 'token_error':
                        errorMessage = 'Error generating authentication token';
                        break;
                    default:
                        errorMessage = 'Authentication failed';
                }
                
                setError(errorMessage);
                
                // Clean up URL parameters
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return {
        initiateGoogleLogin,
        isLoading,
        error,
        clearError: () => setError(null)
    };
};

export default useGoogleAuth;