import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Camera as ExpoCamera, CameraType } from "expo-camera";

interface IProps {
  cameraRef: ExpoCamera | undefined;
  cameraType: CameraType;
  updateCameraRef: (ref: ExpoCamera) => void;
  closeCamera: () => void;
  __takePicture: () => Promise<void>;
}

const Camera = ({
  cameraType,
  cameraRef,
  closeCamera,
  __takePicture,
  updateCameraRef,
}: IProps) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ExpoCamera
        style={{ flex: 0.7, width: "100%" }}
        type={cameraType}
        ref={(r: ExpoCamera) => {
          updateCameraRef(r);
        }}
      />
      <View style={styles.cameraBottomWrapper}>
        <View style={styles.cameraBottomActionsContainer}>
          <TouchableOpacity onPress={closeCamera}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await __takePicture();
            }}
            style={styles.takePicButton}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: "#fff",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ opacity: 0 }}>
            <Text style={{ opacity: 0, fontSize: 18 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  cameraBottomWrapper: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  cameraBottomActionsContainer: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cancelText: { color: "#fff", fontSize: 18 },
  takePicButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: "#fff",
    padding: 5,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
