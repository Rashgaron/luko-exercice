import React from "react";
import { Controller } from "react-hook-form";
import { View, Text, StyleSheet, TextInput } from "react-native";

export const AddItemForm = ({ control, errors }: any) => {
  return (
    <View style={styles.container}>
      {errors.Name && <Text style={styles.error}>This is required</Text>}
      <Controller
        control={control}
        rules={{ required: true }}
        render={(props: any) => <CustomTextInput {...props} testID={"Name"} />}
        name="Name"
      />
      {errors.Value && <Text style={styles.error}>Should be a number</Text>}
      <Controller
        control={control}
        rules={{ required: true, pattern: /^[0-9]*$/ }}
        render={(props: any) => (
          <CustomTextInput {...props} rightIcon={"€"} testID={"Value"} />
        )}
        name="Value"
      />
      <Controller
        control={control}
        render={(props: any) => (
          <CustomTextInput {...props} testID={"Description"} />
        )}
        name="Description"
      />
    </View>
  );
};

const CustomTextInput = (props: any) => {
  const {
    field: { onBlur, onChange, value, name },
    rightIcon,
    testID,
  } = props;

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.label}>{name}</Text>
      <View style={{ padding: 10 }}>
        <View
          style={[
            styles.textInput,
            { height: name === "Description" ? 125 : 40 },
          ]}
        >
          <TextInput
            testID={testID}
            style={styles.textInputItem}
            placeholder={name}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={name === "Description"}
            numberOfLines={name === "Description" ? 5 : 1}
            keyboardType={name === "Value" ? "numeric" : "default"}
          />
          {rightIcon ? <Text style={{ margin: 10 }}>{rightIcon}</Text> : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  textInputContainer: { width: "100%", marginBottom: 5 },
  label: { textAlign: "left", fontSize: 18 },
  error: {
    color: "red",
  },
  textInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  textInputItem: {
    flex: 1,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
