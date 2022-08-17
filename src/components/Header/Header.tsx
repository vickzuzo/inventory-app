import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Inventory</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddInventory")}
      >
        <Ionicons
          name="add"
          size={24}
          color="white"
          style={styles.addButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#2447dc",
  },
  addButtonIcon: {
    color: "#fff",
    fontSize: 16,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "700",
  },
});
