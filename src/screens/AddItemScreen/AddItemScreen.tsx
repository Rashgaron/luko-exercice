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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MAX_VALUE } from "../../context/InventoryReducer";

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

  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useInventoryDispatch() as any;
  const { currentPrice, itemToEdit } = useInventory() as any;
  const { pickImage, takePhoto } = ImagePicker;
  const [image, setImage] = useState<string | null>(null);
  const [extraError, setExtraError] = useState<string>("");

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
    setShowModal(false);
    if (result) {
      const url = result!.assets[0].uri;
      setImage(url);
      setExtraError("");
    }
  };

  const submitForm = async (data: InitialValues) => {
    if (!image) return setExtraError("The image is mandatory");
    if (Number(currentPrice) + Number(data.Value) >= MAX_VALUE) {
      return setExtraError(
        "Can't add more items, max value of 40.000€ reached. Try decreasing the price."
      );
    }
    setExtraError("");
    await dispatch({
      type: "add",
      payload: {
        name: data.Name,
        purchasePrice: data.Value,
        type: "",
        description: data.Description,
        photo: image,
        id: itemToEdit ? itemToEdit.id : undefined,
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
    <KeyboardAwareScrollView
      style={styles.container}
      contentOffset={{ x: 0, y: 0 }}
    >
      <OptionsModal options={options} showModal={showModal} />
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={handleCancelButton} />
          <Button
            title="Add"
            onPress={handleSubmit(submitForm)}
            testID={"AddButton"}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            {extraError.length > 0 ? (
              <Text style={{ color: "red" }}>{extraError}</Text>
            ) : null}
            <TouchableOpacity
              style={[styles.addPhotoButton, !image && { borderWidth: 3 }]}
              onPress={() => setShowModal(true)}
              testID={"AddPhotoButton"}
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
    </KeyboardAwareScrollView>
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
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
});
