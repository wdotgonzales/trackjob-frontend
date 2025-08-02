import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabledText);
    } else {
      baseStyle.push(styles[`${variant}Text`]);
    }
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? '#FFFFFF' : '#007AFF'} 
          />
          {title && <Text style={[getTextStyle(), styles.loadingText]}>{title}</Text>}
        </View>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <View style={styles.contentContainer}>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <View style={styles.contentContainer}>
          <Text style={getTextStyle()}>{title}</Text>
          {icon}
        </View>
      );
    }

    return <Text style={getTextStyle()}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Size variants
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 52,
  },
  
  // Color variants
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#C7C7CC',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  success: {
    backgroundColor: '#34C759',
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Text color variants
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
  outlineText: {
    color: '#007AFF',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  successText: {
    color: '#FFFFFF',
  },
  
  // Disabled styles
  disabled: {
    backgroundColor: '#F2F2F7',
    borderColor: '#C7C7CC',
  },
  disabledText: {
    color: '#8E8E93',
  },
  
  // Layout styles
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    marginLeft: 8,
  },
});

export default CustomButton;

// Usage Examples:
/*
import CustomButton from './CustomButton';

// Basic usage
<CustomButton 
  title="Sign In" 
  onPress={() => console.log('Pressed')} 
/>

// Different variants
<CustomButton 
  title="Primary Button" 
  variant="primary" 
  onPress={() => {}} 
/>

<CustomButton 
  title="Secondary Button" 
  variant="secondary" 
  onPress={() => {}} 
/>

<CustomButton 
  title="Outline Button" 
  variant="outline" 
  onPress={() => {}} 
/>

<CustomButton 
  title="Danger Button" 
  variant="danger" 
  onPress={() => {}} 
/>

// Different sizes
<CustomButton 
  title="Small Button" 
  size="small" 
  onPress={() => {}} 
/>

<CustomButton 
  title="Large Button" 
  size="large" 
  onPress={() => {}} 
/>

// With loading state
<CustomButton 
  title="Loading..." 
  loading={true} 
  onPress={() => {}} 
/>

// Disabled state
<CustomButton 
  title="Disabled" 
  disabled={true} 
  onPress={() => {}} 
/>

// Full width
<CustomButton 
  title="Full Width Button" 
  fullWidth={true} 
  onPress={() => {}} 
/>

// With icon (requires icon component)
<CustomButton 
  title="With Icon" 
  icon={<YourIconComponent />} 
  iconPosition="left" 
  onPress={() => {}} 
/>

// Custom styling
<CustomButton 
  title="Custom Style" 
  style={{ backgroundColor: 'purple' }} 
  textStyle={{ color: 'white', fontSize: 20 }} 
  onPress={() => {}} 
/>
*/