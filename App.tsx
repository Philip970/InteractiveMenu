import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import Home from "./screens/Home";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <Home />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
