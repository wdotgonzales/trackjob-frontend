// AnimatedBar.js - Individual progress bar with animations
import { Animated, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';

const AnimatedBar = ({ 
  item, 
  index, 
  totalItems, 
  activeColor, 
  inactiveColor, 
  activeWidth, 
  inactiveWidth, 
  height, 
  gap, 
  borderRadius,
  setContents,
  setCurrentContent,
  items
}) => {
  // Animation values for smooth transitions
  const widthAnim = useRef(new Animated.Value(item.isUsed ? activeWidth : inactiveWidth)).current;
  const colorAnim = useRef(new Animated.Value(item.isUsed ? 1 : 0)).current;

  // Update animations when item state changes
  useEffect(() => {
    // Animate width change
    Animated.timing(widthAnim, {
      toValue: item.isUsed ? activeWidth : inactiveWidth,
      duration: 600, 
      useNativeDriver: false, // Can't use native driver for width/color
    }).start();

    // Animate color change
    Animated.timing(colorAnim, {
      toValue: item.isUsed ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [item.isUsed, activeWidth, inactiveWidth, widthAnim, colorAnim]);

  // Convert color animation value to actual color
  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  // Handle bar press - jump to that slide
  const handlePress = () => {
    setCurrentContent(index)
    // Update which bar is active
    setContents(() => {
        return items.map((item, itemIndex) => ({
            ...item,
            isUsed: itemIndex === index
        }))
    })
  };

  return (
    <TouchableOpacity onPress={handlePress}>
        <Animated.View
            style={[
            {
                width: widthAnim,
                height: height,
                backgroundColor: interpolatedColor,
                borderRadius: borderRadius,
                // Add gap except for last bar
                marginRight: index < totalItems - 1 ? gap : 0,
            }
            ]}
        />
    </TouchableOpacity>
  );
};

export default AnimatedBar