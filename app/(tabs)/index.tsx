import { View, Text, StyleSheet } from "react-native";
import { useSecureStorage } from "../hooks/useSecureStorage";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Homepage() {
  const { getToken } = useSecureStorage();
  const router = useRouter();

  const fetchToken = async () => {
    const storedToken = await getToken("token");
    isLoggedIn(storedToken);
  };

  const isLoggedIn = (token) => {
    if (!token) {
      router.replace("/(screens)/Login");
    }

    return null;
  };

  useEffect(() => {
    fetchToken();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text>hi from homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#054B63",
  },
});
