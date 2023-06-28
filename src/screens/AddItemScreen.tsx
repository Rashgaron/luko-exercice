import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Touchable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/Button";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
//@ts-ignore
import CameraImage from "../../assets/camera.png";
import React, { useState } from "react";
import { ImagePicker } from "../sdk/ImagePicker";
import { useEffect } from "react";
import {
  useInventory,
  useInventoryDispatch,
} from "../context/InventoryContext";

const { width, height } = Dimensions.get("window");

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useInventoryDispatch() as any;
  const { currentPrice, itemToEdit } = useInventory() as any;
  useEffect(() => {
    if (itemToEdit) {
      setValue("Name", itemToEdit.name);
      console.log(itemToEdit.purchasePrice);
      setValue("Value", itemToEdit.purchasePrice.toString());
      setValue("Description", itemToEdit.description);
      setImage(itemToEdit.photo);
    }
  }, [itemToEdit]);
  const { pickImage, takePhoto } = ImagePicker;
  const [image, setImage] = useState(null);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Value: "",
      Description: "",
    },
  });

  const CustomTextInput = (props: any) => {
    const {
      field: { onBlur, onChange, value, name },
    } = props;
    return (
      <View style={{ width: "100%", marginBottom: 5 }}>
        <Text style={{ textAlign: "left", fontSize: 18 }}>{name}</Text>
        <View style={{ padding: 10 }}>
          <TextInput
            style={{
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              height: name === "Description" ? 125 : 40,
              paddingHorizontal: 5,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 10,
            }}
            placeholder={name}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={name === "Description"}
            numberOfLines={name === "Description" ? 5 : 1}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  };

  const onPressImage = async (pickImageFn: any) => {
    const result = (await pickImageFn()) as any;
    if (result) {
      const url = result!.assets[0].uri;
      setImage(url);
    }
    setShowModal(false);
  };

  const submitForm = (data: any) => {
    console.log(data);
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
        type: "JEWELRY",
        description: data.Description,
        photo: image,
      },
    });
    navigation.goBack();
  };

  console.log(errors);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={200}
    >
      <Modal visible={showModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => onPressImage(takePhoto)}
            >
              <Text>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => onPressImage(pickImage)}
            >
              <Text>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          <Button title="Add" onPress={handleSubmit(submitForm)} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={[styles.addPhotoButton, !image && { borderWidth: 3 }]}
              onPress={() => setShowModal(true)}
            >
              {image ? (
                <Image
                  style={{ width: "100%", aspectRatio: 1, borderRadius: 999 }}
                  resizeMethod="resize"
                  resizeMode="cover"
                  source={{ uri: image }}
                />
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
            {errors.Name && <Text style={styles.error}>This is required</Text>}
            <Controller
              control={control}
              rules={{ required: true }}
              render={(props: any) => <CustomTextInput {...props} />}
              name="Name"
            />
            {errors.Value && (
              <Text style={styles.error}>Should be a number</Text>
            )}
            <Controller
              control={control}
              rules={{ required: true, pattern: /^[0-9]*$/ }}
              render={(props: any) => <CustomTextInput {...props} />}
              name="Value"
            />
            <Controller
              control={control}
              render={(props: any) => <CustomTextInput {...props} />}
              name="Description"
            />
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
  error: {
    color: "red",
  },
  modalButton: {
    height: 50,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});
