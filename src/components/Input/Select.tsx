import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";

interface IProps {
  label?: string;
  items: { label: string; value: any }[];
  placeholder?: string;
  onChange: (value: string) => void;
}

const Select = ({ label, items, placeholder, onChange }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.input}>
        <RNPickerSelect
          placeholder={{ label: placeholder, value: null }}
          onValueChange={onChange}
          items={items}
          style={{
            inputIOS: { padding: 10 },
            inputAndroid: { padding: 30 },
            
          }}
        />
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputLabel: {
    color: "#000",
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    borderColor: "#c6c5c0",
    backgroundColor: "#fff",
    // height: 60,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
});
