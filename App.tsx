import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { Suspense, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Appearance,
  ColorSchemeName,
  StyleSheet,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TabNavigator } from "./src/Router";
import { InventoryDetailsScreen } from "./src/screens";
import AddInventoryScreen from "./src/screens/AddInventory/AddInventoryScreen";
import { serializeAtom } from "./src/Store";

const Preloader = () => {
  const [, dispatch] = useAtom(serializeAtom);
  const load = async () => {
    const value = await AsyncStorage.getItem("inventories");
    if (value) {
      dispatch({ type: "deserialize", value });
    }
  };
  load();
  return null;
};

const App = () => {
  const Stack = createNativeStackNavigator();
  const [theme, setTheme] = useState<ColorSchemeName>();

  const themeChangeListener = useCallback(() => {
    setTheme(Appearance.getColorScheme());
  }, []);

  useEffect(() => {
    Appearance.addChangeListener(themeChangeListener);

    return Appearance.addChangeListener(themeChangeListener).remove();
  }, [themeChangeListener]);

  const lightTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  const darkTheme = {
    dark: true,
    colors: {
      ...DarkTheme.colors,
    },
  };

  return (
    <Suspense
      fallback={
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#2d51e7" size="large" />
        </View>
      }
    >
      <Preloader />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer
            theme={theme === "dark" ? darkTheme : lightTheme}
          >
            <StatusBar style="dark" backgroundColor="#f4f3ef" />

            <Stack.Navigator
              initialRouteName="Main"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Main" component={TabNavigator} />
              <Stack.Screen
                name="InventoryDetails"
                options={{ headerShown: false }}
                component={InventoryDetailsScreen}
              />
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="AddInventory"
                  component={AddInventoryScreen}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
