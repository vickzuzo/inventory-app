import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Inventory } from "../../interfaces";
import { PrimitiveAtom, useAtom } from "jotai";

const InventoryItem = ({
  inventoryAtom,
  navigation,
}: {
  inventoryAtom: PrimitiveAtom<Inventory>;
  navigation: any;
}) => {
  const [item, setItem] = useAtom(inventoryAtom);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("InventoryDetails", {
          inventory: item,
          inventoryAtom,
        })
      }
      style={styles.container}
    >
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>€{item.purchasePrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default InventoryItem;

const styles = StyleSheet.create({
  container: {
    width: "47%",
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: "100%", height: 200 },
  details: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
});
