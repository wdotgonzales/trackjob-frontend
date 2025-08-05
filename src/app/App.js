import AppNavigator from "../navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "react-native-toast-message";

import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: "688288835541-78ourmcu09tcknofiio36rt3qrq4mfoh.apps.googleusercontent.com",
      webClientId: "688288835541-mtrkjup4rv0cfd4oambdf1nuc1ilns7r.apps.googleusercontent.com",
      profileImageSize: 150,
    })
  }, [])
  return (
    <>
      <Provider store={store}>
        <AppNavigator/>
        <Toast />
      </Provider>
    </>
  )
}
