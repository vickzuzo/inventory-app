import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from "react-native";
import React from "react";

interface IProps {
  numberOfLines?: number;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  defaultValue?: any;
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: boolean;
  error?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

const Input = ({
  numberOfLines,
  onChangeText,
  keyboardType,
  label,
  onChange,
  defaultValue,
  multiline,
  placeholder,
  error,
  secureTextEntry,
  leftIcon,
  rightIcon,
}: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        {leftIcon}
        <TextInput
          defaultValue={defaultValue}
          textAlignVertical={multiline ? "top" : "center"}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onChange={onChange}
          style={[
            styles.input,
            {
              minHeight:
                Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : 0,
            },
          ]}
          numberOfLines={Platform.OS === "ios" ? 0 : numberOfLines ?? 1}
          multiline={multiline ?? false}
          keyboardType={keyboardType}
        />
        {rightIcon}
      </View>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputLabel: {
    color: "#000",
    marginBottom: 10,
    fontSize: 14,
  },
  inputContainer: {
    borderColor: "#c6c5c0",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    width: "96%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
