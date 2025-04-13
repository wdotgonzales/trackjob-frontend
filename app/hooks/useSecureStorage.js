import { useCallback } from "react";
import { Platform, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSecureStorage() {
  const isWeb = Platform.OS === "web";

  const saveToken = useCallback(
    async (key, value) => {
      try {
        if (isWeb) {
          await AsyncStorage.setItem(key, value);
        } else {
          await SecureStore.setItemAsync(key, value.toString());
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    [isWeb]
  );

  const getToken = useCallback(
    async (key) => {
      try {
        let result;
        if (isWeb) {
          result = await AsyncStorage.getItem(key);
        } else {
          result = await SecureStore.getItemAsync(key);
        }

        return result;
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    },
    [isWeb]
  );

  const deleteToken = useCallback(
    async (key) => {
      try {
        if (isWeb) {
          await AsyncStorage.removeItem(key);
        } else {
          await SecureStore.deleteItemAsync(key);
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    },
    [isWeb]
  );

  return { saveToken, getToken, deleteToken };
}
