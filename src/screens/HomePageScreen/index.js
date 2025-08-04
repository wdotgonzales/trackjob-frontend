import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useEffect } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

const HomePageScreen = () => {
  const [test, useTest] = useState(true)  

  useFocusEffect(
    useCallback(() => {
        if(!test){
            console.log("home screen is focused/visible")
        }
    }, [])
  )

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <View>
          <Text>HomePageScreen Screen</Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#054B63"
  }
})

export default HomePageScreen