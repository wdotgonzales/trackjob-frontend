// UsageBars.js - Progress indicator component
import { View, StyleSheet } from 'react-native';
import AnimatedBar from './AnimatedBars';
import { useState } from 'react';

const UsageBars = ({ items, setCurrentContent, setContents }) => {
  // Customizable bar appearance settings
  const [activeColor, setActiveColor] = useState('#FF8C42');    // Orange for active bar
  const [inactiveColor, setInactiveColor] = useState('#FFFFFF'); // White for inactive bars
  const [activeWidth, setActiveWidth] = useState(75);           // Width of active bar
  const [inactiveWidth, setInactiveWidth] = useState(35);       // Width of inactive bars
  const [height, setHeight] = useState(6);                      // Bar height
  const [gap, setGap] = useState(4);                           // Space between bars
  const [borderRadius, setBorderRadius] = useState(1);         // Rounded corners

  return (
    <View style={[styles.container]}>
      {/* Render a bar for each content item */}
      {items.map((item, index) => (
        <AnimatedBar
          key={item.id || index}
          item={item}
          index={index}
          totalItems={items.length}
          // Pass styling props
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          activeWidth={activeWidth}
          inactiveWidth={inactiveWidth}
          height={height}
          gap={gap}
          borderRadius={borderRadius}
          // Pass state update functions
          setCurrentContent={setCurrentContent}
          setContents={setContents}
          items={items}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UsageBars;