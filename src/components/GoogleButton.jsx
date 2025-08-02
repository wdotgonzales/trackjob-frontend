import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import GoogleIcon from './GoogleIcon';

const GoogleButton = ({ 
  onPress, 
  title = "Continue with Google",
  style,
  textStyle,
  disabled = false,
  loading = false,
  size = "large" // "small", "medium", "large"
}) => {
  const getButtonStyles = () => {
    const baseStyle = [styles.button];
    
    if (size === "small") {
      baseStyle.push(styles.buttonSmall);
    } else if (size === "medium") {
      baseStyle.push(styles.buttonMedium);
    } else {
      baseStyle.push(styles.buttonLarge);
    }
    
    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    return baseStyle;
  };

  const getTextStyles = () => {
    const baseStyle = [styles.text];
    
    if (size === "small") {
      baseStyle.push(styles.textSmall);
    } else if (size === "medium") {
      baseStyle.push(styles.textMedium);
    } else {
      baseStyle.push(styles.textLarge);
    }
    
    if (disabled) {
      baseStyle.push(styles.textDisabled);
    }
    
    return baseStyle;
  };

  const getIconSize = () => {
    switch (size) {
      case "small": return 16;
      case "medium": return 18;
      case "large": return 20;
      default: return 20;
    }
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {!loading && <GoogleIcon size={getIconSize()} />}
        {loading && (
          <View style={[styles.loadingIndicator, { width: getIconSize(), height: getIconSize() }]} />
        )}
        <Text style={[...getTextStyles(), textStyle]}>
          {loading ? "Please wait..." : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dadce0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonDisabled: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e8eaed',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#3c4043',
    fontWeight: '500',
    marginLeft: 12,
    fontFamily: 'Roboto', // You may need to configure custom fonts
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 16,
  },
  textDisabled: {
    color: '#9aa0a6',
  },
  loadingIndicator: {
    backgroundColor: '#dadce0',
    borderRadius: 10,
  },
});
