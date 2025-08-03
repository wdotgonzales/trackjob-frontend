// src/test/test.js - Run from project root: node src/test/test.js
import 'dotenv/config';

console.log('=== Testing Environment Variables ===');
console.log('API_URL:', process.env.BASE_API_URL);

console.log('\n=== Testing App Config ===');
try {
  // Import from project root (two levels up from src/test/)
  const config = await import('../../app.config.js');
  console.log('✅ Config loaded successfully!');
  console.log('Extra config:', config.default.expo.extra);
  
  // Test individual values
  const { extra } = config.default.expo;
  console.log('\n=== Individual Values ===');
  console.log('apiUrl from config:', extra.baseApiUrl);
  
} catch (error) {
  console.error('❌ Error loading config:', error.message);
}


/*
  process.env.<variable_name> will not work in expo, instead use expo-constants

  ```
    import Constants from 'expo-constants';
    const apiUrl = Constants.expoConfig?.extra?.apiUrl;
  ```
*/