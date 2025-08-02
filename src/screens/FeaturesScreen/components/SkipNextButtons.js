import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SkipNextButtons = ({ handleNext, handleSkip }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={handleSkip}
        activeOpacity={0.8}
      >
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#054B63', // Dark teal background
    padding: 0,
    gap: 10, // Small gap between buttons
  },
  skipButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  nextText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default SkipNextButtons;