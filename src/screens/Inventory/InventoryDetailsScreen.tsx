import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddInventory } from "../AddInventory/helpers";

const InventoryDetailsScreen = ({ route, navigation }: any) => {
  const { inventory, inventoryAtom } = route.params;
  // (inventoryAtom: PrimitiveAtom<Inventory>) => void
  const { deleteInventory } = useAddInventory();

  const handleDelete = () => {
    deleteInventory(inventoryAtom);
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={18} color="black" />
          <Text style={styles.headerBackText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={{ uri: inventory.photo }}
        style={{ flex: 0.7 }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{inventory.title}</Text>
        <Text style={[styles.description, { textTransform: "uppercase" }]}>
          TYPE: {inventory.type}
        </Text>
        <Text style={styles.description}>{inventory.description}</Text>
        <Text style={styles.price}>€{inventory.purchasePrice}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "red" }]}
          onPress={() => handleDelete()}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#2447dc" }]}
          onPress={() => Alert.alert("WIP: Feature not available")}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InventoryDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3ef",
  },
  header: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  headerBackText: {
    fontSize: 18,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  content: {
    flex: 0.4,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    color: "#888",
  },
  price: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  btn: {
    width: "48%",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",

    // marginLeft: 10,
  },
});
