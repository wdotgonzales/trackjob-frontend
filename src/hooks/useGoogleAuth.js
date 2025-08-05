import { useState } from 'react';
import { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";
import { showToast } from "../components/CustomToaster";

const useGoogleAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setData(null);

            // First check if Google Play Services are available
            await GoogleSignin.hasPlayServices();
            
            // Sign out first to force account picker
            // This ensures the user always sees the account selection screen
            try {
                await GoogleSignin.signOut();
            } catch (signOutError) {
                // Ignore sign out errors if user wasn't signed in
                console.log('Sign out not needed or failed:', signOutError);
            }
            
            // Sign in with Google - this will now always show account picker
            const userInfo = await GoogleSignin.signIn();
            
            if (isSuccessResponse(userInfo)) {
                const { user } = userInfo.data;            
                return user;
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setError(error);
            
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        showToast('info', 'Cancelled', 'Google sign-in was cancelled');
                        break;
                    case statusCodes.IN_PROGRESS:
                        showToast('info', 'In Progress', 'Google sign-in is already in progress');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        showToast('error', 'Error', 'Google Play Services not available');
                        break;
                    default:
                        showToast('error', 'Error', 'Google sign-in failed');
                        break;
                }
            } else {
                showToast('error', 'Error', 'Google sign-in failed');
            }
            
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setData(null);
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        data,
        signInWithGoogle,
        reset
    };
};

export default useGoogleAuth;