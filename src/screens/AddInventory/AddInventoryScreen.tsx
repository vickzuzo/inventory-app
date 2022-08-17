import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  CameraPreview,
  CameraSelect,
  Input,
  Select,
} from "../../components";
import { useAddInventory } from "./helpers";
import BottomSheet from "@gorhom/bottom-sheet";

const AddInventoryScreen = ({ navigation }: any) => {
  /**
   * SetCameraType can be used on the <View><Camera /></View> with touchableopacity to make camera switch from back to front and vis-a-vis.
   */

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    cameraType,
    cameraRef,
    previewVisible,
    startCamera,
    hasUnsavedChanges,
    capturedImage,
    __proceed,
    __startCamera,
    __retakePicture,
    __takePicture,
    addInventory,
    allowSave,
    clearImagePreview,
    closeCamera,
    handleFieldsChange,
    fields,
    updateCameraRef,
    errors,
    invalidPrice,
    __selectPicture,
  } = useAddInventory(navigation);

  const openCameraSelect = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <>
      {previewVisible ? (
        <CameraPreview
          photo={capturedImage}
          proceed={__proceed}
          retakePicture={__retakePicture}
        />
      ) : startCamera ? (
        <Camera
          cameraRef={cameraRef}
          updateCameraRef={updateCameraRef}
          cameraType={cameraType}
          closeCamera={closeCamera}
          __takePicture={__takePicture}
        />
      ) : (
        <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (hasUnsavedChanges) {
                  Alert.alert("Warning!!!", "Discard Changes?", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Discard",
                      onPress: () => navigation.goBack(),
                    },
                  ]);
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Text style={[styles.cancelBtn]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (invalidPrice) {
                  Alert.alert(
                    "Warning!!! Price too high",
                    "Price should nto be greather than €40,000"
                  );
                } else if (allowSave) {
                  addInventory();
                  navigation.navigate("Inventory");
                } else {
                  Alert.alert(
                    "Warning!!!",
                    "Please fill all recommended fields"
                  );
                }
              }}
            >
              <Text
                style={[
                  styles.addBtn,
                  { color: allowSave ? "#2d51e7" : "#c6c5c0" },
                ]}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          >
            <ScrollView
              style={{ flex: 1, marginHorizontal: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {capturedImage ? (
                <View style={styles.AddPhotoContainer}>
                  <View style={styles.ImagePreviewContainer}>
                    <Image
                      source={{ uri: capturedImage && capturedImage.uri }}
                      style={styles.ImagePreview}
                    />
                    <TouchableOpacity
                      onPress={clearImagePreview}
                      style={styles.TrashIconContainer}
                    >
                      <Ionicons name="trash-outline" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.AddPhotoContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.AddPhotoBtn}
                    // onPress={__startCamera}
                    onPress={openCameraSelect}
                  >
                    <Ionicons
                      name="camera"
                      size={40}
                      style={styles.cameraIcon}
                    />
                    <Text style={styles.AddPhotoText}>Add Photo</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View>
                <Input
                  label="Name"
                  placeholder="Bracelet"
                  onChange={(e) =>
                    handleFieldsChange("title", e.nativeEvent.text)
                  }
                  defaultValue={fields.title}
                  error={errors.title}
                />
                <Select
                  label="Category"
                  onChange={(text) => handleFieldsChange("category", text)}
                  placeholder="Select a category..."
                  items={[
                    { label: "Art", value: "Art" },
                    { label: "Electronics", value: "Electronics" },
                    { label: "Jewelry", value: "Jewelry" },
                    {
                      label: "Musical Instruments",
                      value: "Musical Instruments",
                    },
                  ]}
                />
                <Input
                  label="Value"
                  placeholder="700"
                  onChange={(e) =>
                    handleFieldsChange("purchasePrice", e.nativeEvent.text)
                  }
                  defaultValue={fields.purchasePrice}
                  keyboardType="number-pad"
                  error={errors.purchasePrice}
                  rightIcon={
                    <Ionicons name="ios-logo-euro" size={16} color="#888" />
                  }
                />
                <Input
                  label="Description"
                  placeholder="Optional"
                  numberOfLines={4}
                  onChange={(e) =>
                    handleFieldsChange("description", e.nativeEvent.text)
                  }
                  defaultValue={fields.description}
                  multiline={true}
                  error={errors.description}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <CameraSelect
            ref={bottomSheetRef}
            openCamera={__startCamera}
            openFileExplorer={__selectPicture}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default AddInventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3ef",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  addBtn: {
    color: "#c6c5c0",
    paddingVertical: 5,
  },
  cancelBtn: {
    color: "#2d51e7",
    paddingVertical: 5,
  },
  AddPhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
  },
  AddPhotoBtn: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#c6c5c0",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  cameraIcon: {
    color: "#2d51e7",
  },
  AddPhotoText: {
    color: "#000",
    fontSize: 12,
  },
  ImagePreview: {
    width: "90%",
    height: "90%",
    borderRadius: 75,
  },
  ImagePreviewContainer: {
    borderStyle: "dashed",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#c6c5c0",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  TrashIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#da5761",
    justifyContent: "center",
    alignItems: "center",
  },
});
