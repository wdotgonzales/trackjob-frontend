import { View, Text, StyleSheet, Pressable } from "react-native";
import TrackJobLogo from "../../assets/images/trackjob-logo.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonWithLogo from "../components/ButtonWithLogo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.trackJobContainer}>
        <View>
          <TrackJobLogo width={185} style={styles.trackJobLogo} />
        </View>
        <Text style={styles.trackJobText}>
          <Text style={{ color: "#06748F" }}>Track</Text>
          <Text style={{ color: "#F97009" }}>Job</Text>
        </Text>
        <Text style={styles.trackJobDescription}>
          Keep track of your hiring journey
        </Text>
      </View>
      <View style={styles.bottomContents}>
        <Text style={styles.loginHereText}>Login Here</Text>
        <View style={{ marginTop: 10 }}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor="grey"
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="grey"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.forgotYourPasswordContainer}>
          <Pressable>
            <Text style={styles.forgotYourPasswordText}>
              Forgot Your Password?
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 30 }}>
          <Button title={"Sign in"} />
        </View>

        <View style={[styles.createNewAccountTextContainer, { marginTop: 30 }]}>
          <Pressable>
            <Text style={styles.createNewAccountText}>Create New Account</Text>
          </Pressable>
        </View>

        <View style={[styles.divider, { marginTop: 25 }]} />

        <View style={[styles.orContinueWithTextContainer, { marginTop: 20 }]}>
          <Text style={styles.orContinueWithText}>Or continue with</Text>
        </View>

        <View style={{ marginTop: 25 }}>
          <ButtonWithLogo
            logo={<AntDesign name="google" size={24} color="#F97009" />}
            title={"Continue With Logo"}
            style={{ backgroundColor: "white", color: "black" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#054B63",
  },
  trackJobContainer: {
    alignItems: "center",
  },
  trackJobLogo: {
    position: "relative",
    right: 14,
    top: 24,
  },
  trackJobText: {
    fontSize: 40,
    fontWeight: "bold",
  },

  trackJobDescription: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
    marginTop: 3,
  },

  bottomContents: {
    marginTop: 31,
    paddingInline: 25,
  },

  loginHereText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },

  forgotYourPasswordContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },

  forgotYourPasswordText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },

  createNewAccountText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },

  createNewAccountTextContainer: {
    alignItems: "center",
  },

  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },

  orContinueWithTextContainer: {
    alignItems: "center",
  },

  orContinueWithText: {
    fontWeight: "bold",
    color: "#F97009",
    fontSize: 15,
  },
});
