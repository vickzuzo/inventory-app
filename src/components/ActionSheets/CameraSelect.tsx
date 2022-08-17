import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CameraSelect = React.forwardRef<
  BottomSheet,
  { openCamera: () => Promise<void>; openFileExplorer: () => Promise<void> }
>(({ openCamera, openFileExplorer }, ref) => {
  const snapPoints = useMemo(() => ["35%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity="0.7"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      // onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Choose Photo</Text>
        <View style={styles.content}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={openCamera}
          >
            <Ionicons name="camera" size={40} style={styles.cameraIcon} />
            <Text>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={openFileExplorer}
          >
            <Ionicons
              name="ios-images-outline"
              size={40}
              style={styles.cameraIcon}
            />
            <Text>Select Photo</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default CameraSelect;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  cameraIcon: {
    color: "#2d51e7",
  },
  content: {
    flexDirection: "row",
    width: "80%",
    height: "80%",
    marginHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#c6c5c0",
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
