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
      package: "com.TrackJob.TrackJob",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.688288835541-78ourmcu09tcknofiio36rt3qrq4mfoh"
        }
      ],
      [
        "expo-image-picker",
        {
          cameraPermission:
            "Allow the app to access your camera to take profile pictures.",
          photosPermission:
            "Allow the app to access your photo library to upload profile pictures."
        }
      ]
    ],
    extra: {
      // Your existing variables
      baseApiUrl: process.env.BASE_API_URL,
      
      // Add AWS S3 configuration
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsRegion: process.env.AWS_REGION,
      s3BucketNameProfileImage: process.env.S3_BUCKET_NAME_PROFILE_IMAGE,
      
      eas: {
        projectId: "4dcdfa4f-9239-427d-9a4b-721f65632d26"
      }
    }
  }
};