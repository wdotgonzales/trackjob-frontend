import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import TrackJobLogo from "../../assets/images/trackjob-logo.svg";
import { Router, router } from "expo-router";

export default function Introduction() {
  return (
    <View style={styles.mainContainer}>
      <TrackJobLogo width={270} style={styles.trackJobLogo} />
      <Text style={styles.trackJobText}>
        <Text style={{ color: "#06748F" }}>Track</Text>
        <Text style={{ color: "#F97009" }}>Job</Text>
      </Text>
      <Text style={styles.trackJobDescription}>
        Keep track of your hiring journey
      </Text>
      <Pressable onPress={() => router.replace("/Features")}>
        <View style={styles.startButtonContainer}>
          <Text style={styles.startButtonText}>Start</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#054B63",
  },

  trackJobLogo: {
    position: "relative",
    right: 14,
  },

  trackJobText: {
    fontSize: 40,
    fontWeight: "bold",
  },

  trackJobDescription: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
    marginTop: 10,
  },

  startButtonContainer: {
    marginTop: 25,
    backgroundColor: "#052731",
    width: 180,
    borderRadius: 20,
  },

  startButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    paddingBlock: 9,
  },
});
