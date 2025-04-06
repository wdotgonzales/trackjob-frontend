import { View, Text, StyleSheet, Pressable } from "react-native";

export default function FeaturesSelectBars({ contents, setContents }) { 
  const showChosenContent = (id) => {
    const updatedContentsVisiblity = contents.map((item) => ({
      ...item,
      isChosen: item.id === id,
    }));

    setContents(updatedContentsVisiblity);
  };
  return (
    <View style={styles.container}>
      {contents?.map((item, index) => (
        <Pressable key={index} onPress={(e) => showChosenContent(item.id)}>
          <View
            style={[
              styles.column,
              item.isChosen ? styles.selectedBar : styles.notSelectedBar,
            ]}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Horizontal layout
    gap: 3,
  },

  column: {
    width: 50,
    height: 5,
  },

  notSelectedBar: {
    backgroundColor: "#FFFFFF",
  },

  selectedBar: {
    backgroundColor: "#FF9700",
    width: 120, // This one is wider
  },
});
