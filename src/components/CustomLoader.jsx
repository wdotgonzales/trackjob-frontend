import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

const CustomLoader = ({
  visible = true,
  size = 60,
  strokeWidth = 4,
  color = '#FF0000', // YouTube red
  backgroundColor = 'rgba(255, 255, 255, 0.3)',
  animationDuration = 1000,
  style = {},
}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    if (visible) {
      // Rotation animation
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );

      // Pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
        ])
      );

      rotateAnimation.start();
      pulseAnimation.start();

      return () => {
        rotateAnimation.stop();
        pulseAnimation.stop();
      };
    }
  }, [visible, animationDuration]);

  if (!visible) return null;

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference * 0.75; // 75% of circle
  const strokeDashoffset = circumference * 0.25; // Offset for gap

  return (
    <View style={[styles.overlay, style]}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.loaderContainer,
            {
              width: size,
              height: size,
              transform: [
                { rotate: rotation },
                { scale: scaleValue },
              ],
            },
          ]}
        >
          {/* Background circle */}
          <View
            style={[
              styles.circle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: backgroundColor,
              },
            ]}
          />
          
          {/* Animated arc */}
          <View
            style={[
              styles.arc,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
  },
  arc: {
    position: 'absolute',
  },
});

export default CustomLoader;