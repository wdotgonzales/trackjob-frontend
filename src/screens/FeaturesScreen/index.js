// FeatureScreen.js - Main onboarding screen component
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { CommonActions } from '@react-navigation/native';
import SkipNextButtons from "./components/SkipNextButtons";
import { contentData } from "./data/contentData";
import { useState, useRef } from "react";
import UsageBars from "./components/UsageBars";

const FeatureScreen = ({ navigation }) => {
  // State to hold all content data
  const [contents, setContents] = useState(contentData)
  // Track which slide is currently showing
  const [currentContent, setCurrentContent] = useState(0);
  // Animation value for fade in/out effect
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Navigate to login screen and clear navigation history
  const navigateToLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  // Handle next button press with fade animation
  const handleNext = () => {
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150, 
      useNativeDriver: true,
    }).start(() => {
      // Check if there are more slides
      if(currentContent < contents.length - 1){
        const nextIndex = currentContent + 1;
        // Update which slide is active
        const updatedContents = contents.map((item, index) => ({
          ...item,
          isUsed: index === nextIndex
        }));
        setContents(updatedContents);
        setCurrentContent(nextIndex);
        // Fade in new content
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      } else {
        // No more slides, go to login
        navigateToLogin();
      }
    });
  }

  // Handle skip button - go directly to login
  const handleSkip = () => {
    navigateToLogin();
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.mainContainer}>
        {/* Main content area with image and text */}
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.animatedContent, { opacity: fadeAnim }]}>
            <Image source={contents[currentContent].imageUrl} style={{ width: 250, height: 200 }} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{contents[currentContent].description}</Text>
            </View>
          </Animated.View>
          {/* Progress indicator bars */}
          <UsageBars
              items={contents}
              setContents={setContents}
              setCurrentContent={setCurrentContent}
          />
        </View>
        
        {/* Skip and Next buttons at bottom */}
        <View style={styles.bottomContainer}> 
          <SkipNextButtons
            handleNext={handleNext}
            handleSkip={handleSkip}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#054B63', // Dark blue background
  },
  
  mainContainer: {
    flex: 1,
  },
  
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  animatedContent: {
    alignItems: 'center',
  },
  
  bottomContainer: {
    margin: 25,
  },

  descriptionContainer: {
    marginInline: 60,
    marginBlock: 35
  },

  description: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "300"
  },
});

export default FeatureScreen;