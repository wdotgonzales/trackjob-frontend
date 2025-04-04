import { Text, View } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import TrackJobLogo from '../assets/images/trackjob-logo.svg';

export default function Index() {
  return (
    <View
      style={styles.mainContainer}
    >
      <TrackJobLogo width={120} height={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  trackJobLogo: {

  }
});
