import 'dotenv/config';

export default {
  expo: {
    name: "trackjob-frontend-react-native",
    slug: "trackjob-frontend-react-native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    // Environment variables accessible in your app
    extra: {
      baseApiUrl: process.env.BASE_API_URL,
      // apiKey: process.env.API_KEY,
      // environment: process.env.ENVIRONMENT,
      // Add any other environment variables you need
    }
  }
};