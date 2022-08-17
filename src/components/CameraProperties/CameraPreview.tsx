import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

interface IProps {
  photo: any;
  proceed: () => void;
  retakePicture: () => void;
}

const CameraPreview = ({ photo, proceed, retakePicture }: IProps) => {
  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 0.85,
          }}
        />
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={retakePicture}
            style={{
              width: 130,
              height: 40,

              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
              }}
            >
              Re-take
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={proceed}
            style={{
              width: 130,
              height: 40,

              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({});
