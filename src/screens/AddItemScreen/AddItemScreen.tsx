import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { RootTabScreenProps } from "../../navigation/types";
import { colors } from "../../theme/colors";
//@ts-ignore
import CameraImage from "../../../assets/camera.png";
// @ts-ignore
import Trash from "../../../assets/trash.png";
import React, { useState } from "react";
import { ImagePicker } from "../../sdk/ImagePicker";
import { useEffect } from "react";
import {
  useInventory,
  useInventoryDispatch,
} from "../../context/InventoryContext";
import { OptionsModal } from "../../components/OptionsModal";
import { AddItemForm } from "./components/AddItemForm";

export interface InitialValues {
  Name: string;
  Value: string;
  Description: string;
}

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const options = [
    {
      title: "Open Camera",
      onPress: () => onPressImage(takePhoto),
    },
    {
      title: "Open Gallery",
      onPress: () => onPressImage(pickImage),
    },
    {
      title: "Cancel",
      onPress: () => setShowModal(false),
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const dispatch = useInventoryDispatch() as any;
  const { currentPrice, itemToEdit } = useInventory() as any;

  const { pickImage, takePhoto } = ImagePicker;
  const [image, setImage] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InitialValues>({
    defaultValues: {
      Name: "",
      Value: "",
      Description: "",
    },
  });

  const onPressImage = async (pickImageFn: () => Promise<any>) => {
    const result = (await pickImageFn()) as any;
    if (result) {
      const url = result!.assets[0].uri;
      setImage(url);
    }
    setShowModal(false);
  };

  const submitForm = (data: InitialValues) => {
    if (!image) return;
    if (Number(currentPrice) + Number(data.Value) > 40000) {
      return;
    }
    dispatch({
      type: "add",
      payload: {
        id: Math.random(),
        name: data.Name,
        purchasePrice: data.Value,
        type: "",
        description: data.Description,
        photo: image,
      },
    });
    navigation.goBack();
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleCancelButton = () => {
    dispatch({ type: "setItemToEdit", payload: null });
    navigation.goBack();
  };

  const loadItemToEdit = (itemToEdit: any) => {
    setValue("Name", itemToEdit.name);
    setValue("Value", itemToEdit.purchasePrice.toString());
    setValue("Description", itemToEdit.description);
    setImage(itemToEdit.photo);
  };

  useEffect(() => {
    if (itemToEdit) {
      loadItemToEdit(itemToEdit);
    }
  }, [itemToEdit]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={200}
    >
      <OptionsModal options={options} showModal={showModal} />
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={handleCancelButton} />
          <Button title="Add" onPress={handleSubmit(submitForm)} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={[styles.addPhotoButton, !image && { borderWidth: 3 }]}
              onPress={() => setShowModal(true)}
            >
              {image ? (
                <>
                  <Image
                    style={styles.itemImage}
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={{ uri: image }}
                  />
                  <TouchableOpacity
                    style={styles.deleteImageButton}
                    onPress={handleDeleteImage}
                  >
                    <Image style={{ width: 40, height: 40 }} source={Trash} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Image
                    style={{ width: 50, height: 50 }}
                    resizeMethod="resize"
                    resizeMode="cover"
                    source={CameraImage}
                  />
                  <Text style={styles.addPhotoText}>Add photo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <AddItemForm control={control} errors={errors} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteImageButton: {
    position: "absolute",
    right: -5,
    bottom: -5,
  },
  itemImage: { width: "100%", aspectRatio: 1, borderRadius: 999 },
  addPhotoButton: {
    width: "45%",
    aspectRatio: 1,
    borderColor: "gray",
    borderStyle: "dashed",
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoText: {
    fontSize: 16,
  },
  formContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
  },
});
