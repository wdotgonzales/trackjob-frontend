import React from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import featureContents from "@/app/constants/featureContents";
import FeaturesSelectBars from "@/app/components/FeaturesSelectBars";
import FeaturesButton from "@/app/components/FeaturesButton";

export default function Feature() {
  const [contents, setContents] = useState(featureContents);
  const [contentToDisplay, setContentToDisplay] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value: 0

  useEffect(() => {
    if (contents) {
      const content = contents.find((content) => content.isChosen == true);
      setContentToDisplay(content);
    }
  }, [contents]);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, contents]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        {contentToDisplay && (
          <>
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <contentToDisplay.SvgComponent width={250} />
              </View>
              <View style={styles.contentDescriptionContainer}>
                <Text style={styles.contentDescription}>
                  {contentToDisplay.description}
                </Text>
              </View>
            </Animated.View>

            <View style={{ marginTop: 25 }}>
              <FeaturesSelectBars
                contents={contents}
                setContents={setContents}
              />
            </View>
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <FeaturesButton contents={contents} setContents={setContents} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#054B63",
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentDescriptionContainer: {
    marginInline: 100,
    marginTop: 16,
  },

  contentDescription: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: 100,
  },

  buttonContainer: {
    padding: 15,
  },
});
