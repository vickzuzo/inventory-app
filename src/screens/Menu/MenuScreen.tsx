import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MenuScreen</Text>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3ef",
    alignItems: "center",
    justifyContent: "center",
  },
});
