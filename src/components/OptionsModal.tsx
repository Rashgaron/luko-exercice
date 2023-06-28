import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
export interface IOptionsModal {
  title: string;
  onPress: () => void;
}
export const OptionsModal = ({
  options,
  showModal,
}: {
  options: IOptionsModal[];
  showModal: boolean;
}) => {
  return (
    <Modal visible={showModal} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          {options.map((option: IOptionsModal, index: number) => {
            return (
              <TouchableOpacity
                key={option.title}
                style={[
                  styles.modalButton,
                  index === options.length - 1 && {
                    borderColor: "red",
                    backgroundColor: "red",
                    marginTop: 20,
                  },
                ]}
                onPress={option.onPress}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    index === options.length - 1 && { color: "white" },
                  ]}
                >
                  {option.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  viewContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 10,
  },
  modalButton: {
    height: 50,
    width: "90%",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
