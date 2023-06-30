import React from "react";
import { Controller } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

export const AddItemForm = ({ control, errors }: any) => {
  return (
    <View style={styles.container}>
      {errors.Name && <Text style={styles.error}>The name is required</Text>}
      <Controller
        control={control}
        rules={{ required: true }}
        render={(props: any) => (
          <CustomTextInput
            {...props}
            testID={"Name"}
            placeholder={"Bracelet"}
          />
        )}
        name="Name"
      />
      {errors.Value && <Text style={styles.error}>The value is required</Text>}
      <Controller
        control={control}
        rules={{ required: true, pattern: /^[0-9]*$/ }}
        render={(props: any) => (
          <CustomTextInput
            {...props}
            rightIcon={"€"}
            testID={"Value"}
            placeholder={"700"}
            keyboardType="numeric"
          />
        )}
        name="Value"
      />
      <Controller
        control={control}
        render={(props: any) => (
          <CustomTextInput
            {...props}
            testID={"Description"}
            placeholder={"Optional"}
            multiline
            numberOfLines={5}
            height={100}
          />
        )}
        name="Description"
      />
    </View>
  );
};

interface IProps {
  field: {
    onBlur: () => void;
    onChange: () => void;
    value: string;
    name: string;
  };
  rightIcon: string;
  testID: string;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  height?: number;
}

const CustomTextInput = (props: IProps) => {
  const {
    field: { onBlur, onChange, value, name },
    rightIcon,
    testID,
    placeholder,
    multiline = false,
    numberOfLines = 1,
    keyboardType = "default",
    height = 40,
  } = props;

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.label}>{name}</Text>
      <View style={{ padding: 10 }}>
        <View style={[styles.textInput, { height }]}>
          <TextInput
            testID={testID}
            style={styles.textInputItem}
            placeholderTextColor={"lightgrey"}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
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
  label: { textAlign: "left", fontSize: 16 },
  error: {
    color: "red",
    textAlign: "center",
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
