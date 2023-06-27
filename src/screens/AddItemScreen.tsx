import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/Button";
import { RootTabScreenProps } from "../navigation/types";
import { colors } from "../theme/colors";
import CameraImage from "../../assets/camera.png";
import React from "react";
import { ImagePicker } from "../sdk/ImagePicker";

const { width, height } = Dimensions.get("window");

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const { pickImage } = ImagePicker;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Value: "",
      Description: "",
    },
  });

  const CustomTextInput = (props: any) => {
    console.log(props);
    const {
      field: { onBlur, onChange, value, name },
    } = props;
    console.log(name);
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
          />
        </View>
      </View>
    );
  };

  const onPressImage = async () => {
    const url = await pickImage();
    console.log(url);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={200}
    >
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          <Button title="Add" disabled onPress={() => undefined} />
        </View>
        <View style={{ flex: 1 }}>
          {/* Add photo */}
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={onPressImage}
            >
              <Image
                style={{ width: 50, height: 50 }}
                resizeMethod="resize"
                resizeMode="cover"
                source={CameraImage}
              />
              <Text style={styles.addPhotoText}>Add photo</Text>
            </TouchableOpacity>
          </View>
          {/* Form  */}
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={(props: any) => <CustomTextInput {...props} />}
              name="Name"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={(props: any) => <CustomTextInput {...props} />}
              name="Value"
            />
            <Controller
              control={control}
              rules={{ required: true }}
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
    borderWidth: 3,
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
