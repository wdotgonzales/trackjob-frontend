import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import noProfilePictureTemplate from "@/assets/images/no-profile-pic.png";
import UserIcon from "@/assets/icons/user.svg";
import LockIcon from "@/assets/icons/lock.svg";
import GreaterThanIcon from "@/assets/icons/greater-than.svg";
import SubscriptionsIcon from "@/assets/icons/dollar.svg";
import { useSecureStorage } from "../hooks/useSecureStorage";
import { router, useRouter } from "expo-router";
import { useLogout } from "../hooks/useLogout";
import { useEffect } from "react";

export default function Settings() {
  const { deleteToken, getToken } = useSecureStorage();
  const route = useRouter();
  const { logout, data, isLoading, error, statusCode } = useLogout();

  const handleLogout = async () => {
    const storedToken = await getToken("token");

    if (!storedToken) {
      alert("no token found..");
      return;
    }

    deleteToken("token");
    logout(storedToken);
  };

  useEffect(() => {
    if (statusCode == 200) {
      alert("logout success");
      route.replace("/(screens)/Login");
      return;
    }
  }, [logout, data, isLoading, error, statusCode]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageTextContainer}>
        <ImageBackground
          resizeMode="cover"
          source={noProfilePictureTemplate}
          style={styles.image}
          imageStyle={styles.image}
        />
        <Text style={styles.fullName}>Wilson Rizzales</Text>
      </View>

      <View style={styles.contentButtonContainer}>
        <Text style={styles.accountSettingsText}>Account Settings</Text>

        {/* child 1 */}
        <Pressable>
          <View style={{ marginTop: 25 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <UserIcon width={20} height={20} />
                <Text style={styles.buttonLabel}>Personal Information</Text>
              </View>
              <View>
                <GreaterThanIcon width={25} height={25} />
              </View>
            </View>
            <View
              style={{ height: 2, backgroundColor: "#636363", marginTop: 12 }}
            />
          </View>
        </Pressable>

        <Pressable>
          <View style={{ marginTop: 15 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <LockIcon width={20} height={20} />
                <Text style={styles.buttonLabel}>Change Password</Text>
              </View>
              <View>
                <GreaterThanIcon width={25} height={25} />
              </View>
            </View>
            <View
              style={{ height: 2, backgroundColor: "#636363", marginTop: 12 }}
            />
          </View>
        </Pressable>

        <Pressable>
          <View style={{ marginTop: 15 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <SubscriptionsIcon width={20} height={20} />
                <Text style={styles.buttonLabel}>Subscriptions</Text>
              </View>
              <View>
                <GreaterThanIcon width={25} height={25} />
              </View>
            </View>
            <View
              style={{ height: 2, backgroundColor: "#636363", marginTop: 12 }}
            />
          </View>
        </Pressable>

        <Pressable onPress={handleLogout}>
          <View style={{ marginTop: 15 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={[styles.buttonLabel, { color: "red" }]}>
                  Logout
                </Text>
              </View>
            </View>
            <View
              style={{ height: 2, backgroundColor: "#636363", marginTop: 12 }}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#054B63",
    flex: 1,
  },

  imageTextContainer: {
    alignItems: "center",
    marginTop: 45,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "white",
  },

  fullName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    marginTop: 12,
  },

  accountSettingsText: {
    fontSize: 19,
    fontWeight: "500",
    color: "white",
  },

  contentButtonContainer: {
    paddingInline: 20,
    marginTop: 30,
  },

  buttonLabel: {
    fontSize: 18,
    color: "white",
  },
});
