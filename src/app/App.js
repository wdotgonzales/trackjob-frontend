import AppNavigator from "../navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigator/>
        <Toast />
      </Provider>
    </>
  )
}
