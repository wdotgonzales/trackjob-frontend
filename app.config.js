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
      supportsTablet: true,
      bundleIdentifier: "com.TrackJob.TrackJob"
    },
    android: {
      package: "com.TrackJob.TrackJob", // ✅ Add this line
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,
      permissions: ["INTERNET", "ACCESS_NETWORK_STATE"]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      baseApiUrl: process.env.BASE_API_URL,
      eas: {
        projectId: "4dcdfa4f-9239-427d-9a4b-721f65632d26"
      }
    }
  }
};
