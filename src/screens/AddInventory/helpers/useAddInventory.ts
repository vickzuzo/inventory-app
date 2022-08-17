import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { atom, PrimitiveAtom, useAtom } from "jotai";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Inventory } from "../../../interfaces";
import { inventoriesAtomsAtom, serializeAtom } from "../../../Store";
import { checkFormValid, uuid, validators } from "../../../utils";

type AddInventoryFields = {
  title: string;
  category: string;
  purchasePrice: string;
  description: string;
};

export const useAddInventory = (navigation?: any) => {
  const [startCamera, setStartCamera] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const __selectPicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCapturedImage(result);
    }
  };

  const initialFields: AddInventoryFields = {
    title: "",
    category: "",
    purchasePrice: "",
    description: "",
  };

  const [fields, setFields] = useState(initialFields);
  const [errors, setFormErrors] = useState(initialFields);

  const handleFieldsChange = (field: string, value: string) => {
    setFields({
      ...fields,
      [field]: value,
    });
    const error = validators[field](value);
    setFormErrors((formError) => ({ ...formError, [field]: error }));
  };

  const [, dispatch] = useAtom(serializeAtom);

  const save = () => {
    dispatch({
      type: "serialize",
      callback: async (value) => {
        await AsyncStorage.setItem("inventories", value);
      },
    });
  };

  let cameraRef: ExpoCamera | undefined;

  const updateCameraRef = (ref: ExpoCamera) => {
    cameraRef = ref;
  };

  const __takePicture = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.takePictureAsync();
    setPreviewVisible(capturedImage ? true : false);
    setCapturedImage(photo);
  };

  const __startCamera = async () => {
    const { status } = await ExpoCamera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Camera Access denied!!!");
    }
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __proceed = () => {
    setStartCamera(false);
    setPreviewVisible(false);
  };

  const clearImagePreview = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const [, setInventories] = useAtom(inventoriesAtomsAtom);

  // const inventoryObject = {
  //   image: capturedImage?.uri || "",
  //   title,
  //   description,
  //   category,
  //   purchasePrice,
  //   // id: uuid(),
  // };

  const { title, category, purchasePrice, description } = fields;

  const allowSave: boolean =
    title && category && purchasePrice && capturedImage;

  const addInventory = () => {
    const isValid = checkFormValid(
      { title, category, purchasePrice },
      setFormErrors
    );
    if (!isValid) return;

    const newAtom = atom<Inventory>({
      title,
      id: uuid(),
      purchasePrice,
      type: category,
      description,
      photo: capturedImage?.uri ?? "",
    });
    setInventories((prev) => {
      return [...prev, newAtom];
    });
    save();
    setFields(initialFields);
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const deleteInventory = useCallback(
    (inventoryAtom: PrimitiveAtom<Inventory>) => {
      setInventories((prev) => prev.filter((item) => item !== inventoryAtom));
    },
    [setInventories]
  );
  const hasUnsavedChanges = Object.values(errors).some(Boolean);

  const closeCamera = () => {
    setStartCamera(false);
  };

  return {
    startCamera,
    cameraType,
    previewVisible,
    hasUnsavedChanges,
    cameraRef,
    capturedImage,
    addInventory,
    __proceed,
    __retakePicture,
    __takePicture,
    __startCamera,
    clearImagePreview,
    allowSave,
    closeCamera,
    handleFieldsChange,
    fields,
    updateCameraRef,
    __selectPicture,
    errors,
    deleteInventory,
    invalidPrice: +purchasePrice > 40000,
  };
};
