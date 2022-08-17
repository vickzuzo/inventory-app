import { useAtom } from "jotai";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, InventoryItem } from "../../components";
import { inventoriesAtomsAtom } from "../../Store";

const InventoryScreen = ({ navigation }: any) => {
  const [inventories] = useAtom(inventoriesAtomsAtom);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <Header navigation={navigation} />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inventoryContainer}>
            {inventories.length > 0 ? (
              inventories.map((inventoryAtom, _idx) => (
                <InventoryItem
                  key={String(inventoryAtom)}
                  inventoryAtom={inventoryAtom}
                  navigation={navigation}
                />
              ))
            ) : (
              <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>No Inventories Found</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddInventory")}
                >
                  <Text style={styles.addNewInventoryText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3ef",
  },
  inventoryContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 42,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 30,
    marginBottom: 20,
  },
  addNewInventoryText: {
    fontSize: 20,
    color: "#2447dc",
    textTransform: "uppercase",
  },
});
