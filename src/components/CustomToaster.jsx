import Toast from "react-native-toast-message";
export const showToast = (type, title, message) => {
    Toast.show({
        type: type,         // 'success' | 'error' | 'info'
        text1: title,       // Bold title
        text2: message,     // Lighter message
        position: 'top',    // 'top' | 'bottom'
        visibilityTime: 1500, // Time the toast stays visible (ms)
        autoHide: true,
        topOffset: 60,
    });
};