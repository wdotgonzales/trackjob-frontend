// components/Button.js
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

const ButtonWithLogo = ({
  logo,
  title,
  onPress,
  disabled,
  loading,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, disabled && styles.disabled, style]}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View>{logo}</View>
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#052731", // dark blue-black color
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    shadowColor: "#000", // black shadow
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 17,
  },
  disabled: {
    backgroundColor: "#a5b1c2",
  },
});

export default ButtonWithLogo;
