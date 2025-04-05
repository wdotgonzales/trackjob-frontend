  import React from "react";
  import { Text, View, Pressable } from "react-native";
  import { StyleSheet } from "react-native";
  import { Router, router } from "expo-router";

  export default function Feature() {
    return (
      <View style={styles.mainContainer}>
        <Text>hi from feaature</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    mainContainer: {},
  });
