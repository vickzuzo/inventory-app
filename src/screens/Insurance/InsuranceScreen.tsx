import { StyleSheet, Text, View } from "react-native";
import React from "react";

const InsuranceScreen = () => {
  return (
    <View style={styles.container}>
      <Text>InsuranceScreen</Text>
    </View>
  );
};

export default InsuranceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3ef",
    alignItems: "center",
    justifyContent: "center",
  },
});
