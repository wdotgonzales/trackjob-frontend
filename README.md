# 📱 TrackJob Mobile App

TrackJob is a mobile app built with React Native that helps you keep track of your job applications. It allows you to monitor the progress of each application and view important details such as the job title, company name, work arrangement (remote, hybrid, or onsite), application status, and employment type. With TrackJob, staying organized throughout your job search becomes easier and more efficient.

## 📸 Screenshots

<div align="center">
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-1.png" width="250" alt="TrackJob Screenshot 1"/>
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-2.png" width="250" alt="TrackJob Screenshot 2"/>
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-3.png" width="250" alt="TrackJob Screenshot 3"/>
</div>

<div align="center">
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-4.png" width="250" alt="TrackJob Screenshot 4"/>
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-5.png" width="250" alt="TrackJob Screenshot 5"/>
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-6.png" width="250" alt="TrackJob Screenshot 6"/>
</div>

<div align="center">
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-7.png" width="250" alt="TrackJob Screenshot 7"/>
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-8.png" width="250" alt="TrackJob Screenshot 8"/>
  <img src="https://trackjob-profile-images.s3.ap-southeast-1.amazonaws.com/trackjob-frontend-screenshots/image-9.png" width="250" alt="TrackJob Screenshot 9"/>
</div>

<p align="center">
  <em>TrackJob helps you stay organized and on top of your job search journey</em>
</p>

## ✨ Features

### 📋 Job Application Management
- **Complete CRUD Operations** - Create, read, update, and delete job applications
- **Company Information Tracking** - Store and manage detailed company information
- **Position Details** - Track job titles, descriptions, requirements, and posting links
- **Application Timeline** - Monitor submission dates and track application progress over time

### 📊 Status Tracking System
TrackJob supports comprehensive application status monitoring with 9 distinct states:
- **Default** - Newly added applications
- **Applied** - Application successfully submitted
- **Interview Scheduled (I.S.)** - Interview appointments confirmed
- **Under Process (U.P.)** - Application being reviewed
- **Offer Received (O.R.)** - Job offer extended
- **Accepted Offer (A.O.)** - Offer accepted, position secured
- **Rejected** - Application declined
- **Ghosted** - No response received from employer
- **Withdrawn/Cancelled (W/C.)** - Application withdrawn by user

### 💼 Employment Classification
- **Full-Time Positions** - Permanent, full-time roles
- **Part-Time Positions** - Part-time and flexible hour positions
- **Contract Roles** - Temporary, contract, and freelance opportunities

### 🏢 Work Arrangement Options
- **On-site** - Traditional office-based positions
- **Remote** - Fully remote work opportunities
- **Hybrid** - Flexible combination of remote and office work

### 🔍 Advanced Filtering & Search
- **Multi-Parameter Filtering** - Filter by status, employment type, work arrangement
- **Company & Position Search** - Search by company name and job title
- **Date Range Filtering** - Filter applications by submission dates
- **Real-time Results** - Instant filtering with pagination support

### 🔔 Smart Reminder System
- **Custom Reminders** - Set personalized reminders for each application
- **Flexible Scheduling** - Schedule reminders for follow-ups, interviews, and deadlines
- **Bulk Reminder Creation** - Create multiple reminders simultaneously
- **Enable/Disable Control** - Toggle reminders on/off as needed

### 🔐 Security & Authentication
- **JWT Authentication** - Secure token-based authentication system
- **OAuth 2.0 Integration** - Google Sign-In support for seamless access
- **Email Verification** - Secure account verification process
- **Password Reset** - Self-service password recovery

### 🛡️ Data Management
- **Bulk Operations** - Delete all applications or create multiple reminders at once
- **Data Export/Import** - Backup and restore your application data
- **Profile Management** - Update personal information and profile pictures
- **Cloud Storage Integration** - AWS S3 integration for file uploads

### 🏗️ Architecture & State Management
- **Redux Toolkit (RTK)** - Modern Redux with simplified boilerplate and built-in best practices
- **RTK Query** - Powerful data fetching and caching solution (if implemented)
- **Feature-based Structure** - Organized by feature modules (auth, jobApplication, profile)
- **Custom Components** - Reusable UI components with consistent styling
- **Service Layer** - API integration and data fetching utilities

### 📱 Cross-Platform Experience
- **iOS & Android Native** - Full native experience on both platforms
- **Web Progressive App** - Access through web browsers with PWA features
- **Real-time Sync** - Data synchronization across all devices
- **Offline Capability** - Limited functionality available offline

## 🚀 Getting Started

These instructions will help you set up and run the project locally for development and testing purposes.

### 📦 Prerequisites

Make sure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/)** (v18 or later recommended)
- **[npm](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)**
- **[Git](https://git-scm.com/)**
- **[Expo CLI](https://docs.expo.dev/get-started/installation/)** - Install globally:
  ```bash
  npm install -g @expo/cli
  ```

#### For Physical Device Testing
- **[Expo Go](https://expo.dev/client)** app on your mobile device

#### For Emulator/Simulator Testing
- **[Android Studio](https://developer.android.com/studio)** (for Android development)
- **[Xcode](https://developer.apple.com/xcode/)** (for iOS development, macOS only)

#### Additional Requirements
- **[Java JDK 11+](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)** (for Android builds)

## 🌐 Backend Integration

This mobile app connects to the [TrackJob REST API](https://github.com/wdotgonzales/trackjob-backend) which provides:

### 🔗 API Endpoints
- **Authentication** - Registration, login, JWT token management, OAuth 2.0
- **Email Verification** - Secure email verification with 6-digit codes
- **Job Applications** - Full CRUD operations with advanced filtering
- **Reminders** - Nested reminder system for each job application
- **Profile Management** - User profile and image upload functionality
- **Bulk Operations** - Efficient batch operations for data management

### 🏗️ Backend Tech Stack
- **Framework**: Django REST Framework
- **Database**: MySQL (AWS RDS)
- **Authentication**: JWT + OAuth 2.0 (Google)
- **Email Service**: Gmail SMTP
- **File Storage**: AWS S3
- **Caching**: Redis
- **Hosting**: AWS EC2 with Docker
- **CDN**: Cloudflare

### 📡 Production API
```
Base URL: https://trackjob-api.live/api/v1/
Status: ✅ Live and operational
```

---

## 🛠 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/trackjob-frontend-react-native.git
cd trackjob-frontend-react-native
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables
Copy the example environment file and configure your settings:

**For Windows (Git Bash) or Mac/Linux:**
```bash
cp .env.example .env
```

**For Windows (Command Prompt/PowerShell):**
```cmd
copy .env.example .env
```

Edit the `.env` file with your actual values:
```env
# API Configuration
BASE_API_URL=https://trackjob-api.live/api/v1/

# AWS Configuration (for profile image uploads)
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_REGION=YOUR_AWS_REGION
S3_BUCKET_NAME_PROFILE_IMAGE=YOUR_S3_BUCKET_NAME_FOR_PROFILE_IMAGES
```

> **Note**: Replace `YOUR_*` placeholders with your actual AWS credentials and configuration values.

---

## ▶️ Running the App

### Start the Development Server
```bash
# Start with Expo
npx expo start --clear

# Alternative: Start with React Native CLI (if using bare workflow)
npx react-native start --reset-cache
```

This will open the Expo DevTools in your browser. From here you can:

### Run on Physical Device
1. Install **Expo Go** from App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

### Run on iOS Simulator (macOS only)
```bash
# Press 'i' in the terminal, or
npx expo start --ios

# Alternative: Direct React Native command
npx react-native run-ios
```

### Run on Android Emulator
```bash
# Press 'a' in the terminal, or
npx expo start --android

# Alternative: Direct React Native command
npx react-native run-android
```

### Web Development
```bash
# Press 'w' in the terminal, or
npx expo start --web
```

---

## 📁 Project Structure

```
trackjob-frontend-react-native/
├── 📱 android/               # Android native code and configuration
├── 🎨 assets/                # Images, fonts, and other static assets
├── 📂 src/                   # Main source code directory
│   ├── ⚙️ app/              # App configuration and Redux store
│   │   ├── App.js           # Main App component
│   │   └── store.js         # Redux Toolkit store configuration
│   ├── 🧩 components/       # Reusable UI components (13 components)
│   │   ├── CustomButton.jsx              # Custom button component
│   │   ├── CustomInput.jsx               # Custom input component
│   │   ├── CustomLoader.jsx              # Loading indicator
│   │   ├── CustomModal.jsx               # Modal component
│   │   ├── CustomSelectEmploymentTypeStatus.jsx # Employment type selector
│   │   ├── CustomSelectJobapplicationStatus.jsx # Job status selector
│   │   ├── CustomSelectWorkArrangementStatus.jsx # Work arrangement selector
│   │   ├── CustomToaster.jsx             # Toast notifications
│   │   ├── GoogleButton.jsx              # Google OAuth button
│   │   ├── GoogleIcon.jsx                # Google icon component
│   │   ├── JobApplicationCard.jsx        # Job application card display
│   │   ├── JobApplicationIconComponent.jsx # Job application icons
│   │   └── RadioButton.jsx               # Radio button component
│   ├── 🔧 features/         # Feature-based Redux slices
│   │   ├── authentication/  # Authentication feature
│   │   │   └── authSlice.js
│   │   ├── jobApplication/  # Job application management
│   │   │   └── listJobApplicationSlice.js
│   │   └── profile/         # User profile management
│   │       └── profileSlice.js
│   ├── 🪝 hooks/            # Custom React hooks (4 hooks)
│   │   ├── useGoogleAuth.js      # Google authentication hook
│   │   ├── useOtpCountdown.js    # OTP countdown functionality
│   │   ├── useS3ImageUpload.js   # S3 image upload hook
│   │   └── useTimeGreeting.js    # Time-based greeting hook
│   ├── 🧭 navigation/       # Navigation configuration
│   │   ├── AppNavigator.js           # Main app navigation
│   │   └── AuthenticatedTabNavigator.js # Authenticated user navigation
│   ├── 📱 screens/          # Screen components (9 screen folders)
│   │   ├── AnalyticsScreen/
│   │   ├── CreateJobApplicationScreen/
│   │   ├── FeaturesScreen/
│   │   ├── HomePageScreen/
│   │   ├── LoginScreen/
│   │   ├── RegisterScreen/
│   │   ├── SettingsScreen/
│   │   ├── SingleJobApplicationScreen/
│   │   └── StartScreen/
│   ├── 🌐 services/         # API services and HTTP client
│   │   └── httpClient.js    # Centralized HTTP client
│   ├── 🧪 tests/            # Test files
│   │   └── env.test.js
│   └── 🛠️ utils/            # Utility functions
│       └── utils.js
├── 🔧 Configuration Files
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment variables template
│   ├── app.config.js        # Expo app configuration
│   ├── app.json            # Expo configuration
│   ├── eas.json            # Expo Application Services config
│   ├── index.js            # App entry point
│   ├── metro.config.js     # Metro bundler configuration
│   └── package.json        # Dependencies and scripts
```

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run web` | Run on web browser |
| `npm run lint` | Run ESLint for code quality |
| `npm run test` | Run the test suite |
| `npm run build` | Create production build |
| `npm run build:android` | Build Android APK |
| `npm run build:ios` | Build iOS IPA (macOS only) |

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Metro Config Error
If you see "No Metro config found" error:
```bash
# Clear cache and restart
npx expo start --clear
```

#### Build Cache Issues
```bash
# Clear all caches
npx expo start --clear
rm -rf node_modules
npm install
```

#### Android Build Cache Issues
```bash
# Clear Android build cache
cd android && ./gradlew clean && cd ..

# For Windows
cd android && gradlew clean && cd ..
```

#### iOS Build Issues
```bash
# Clear iOS build cache
npx expo run:ios --clear-cache
```

#### Environment Variables Not Loading
- Ensure your `.env` file is in the root directory
- Restart the development server after making changes
- Check that variable names match exactly in your code
- For Expo, variables must be prefixed with `EXPO_PUBLIC_` for client-side access

#### Node Modules Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# For Windows
rmdir /s node_modules
npm install
```

---

## 🏭 Building for Production

### Create Development Build
```bash
npx expo build --platform android
npx expo build --platform ios
```

### Create Production Build
```bash
# For Android (APK)
npx expo build:android -t apk

# For iOS (IPA)
npx expo build:ios -t archive
```

### Publish Updates
```bash
npx expo publish
```

---

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

### 🔧 Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### 📝 Coding Standards
- Follow React Native and Expo best practices
- Use Redux Toolkit patterns (createSlice, createAsyncThunk)
- Implement proper state management with RTK
- Use consistent component naming conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation when needed

### 🐛 Bug Reports
When reporting bugs, please include:
- Device information (iOS/Android version)
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or screen recordings if applicable

---

## 📱 Supported Platforms

- ✅ **Android** 6.0+ (API level 23+)
- ✅ **iOS** 11.0+
- ✅ **Web** (Progressive Web App)

---

## 🔒 Privacy & Security

- **End-to-End Encryption** - All data is encrypted in transit using HTTPS/TLS
- **Secure Authentication** - JWT tokens with refresh/access token rotation
- **Data Protection** - Personal information encrypted at rest in AWS RDS
- **GDPR Compliance** - Full compliance with data protection regulations
- **No Third-Party Sharing** - Your data is never shared with unauthorized parties
- **AWS Security** - Leveraging AWS security best practices and infrastructure
- **Regular Security Audits** - Continuous monitoring and security assessments

See our [Privacy Policy](link-to-privacy-policy) for complete details.

---

## 📞 Support

- 📧 **Email**: [wdotgonzales@gmail.com](mailto:wdotgonzales@gmail.com)
