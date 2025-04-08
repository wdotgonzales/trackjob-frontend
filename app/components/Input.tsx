// components/Input.js
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, style, ...props }) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={[styles.input, style]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        height: 42,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});

