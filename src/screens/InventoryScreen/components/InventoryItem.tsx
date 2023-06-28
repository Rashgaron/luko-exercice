// @ts-ignore
import DeleteButton from "../../../../assets/close.png";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { Item } from "../../../context/InventoryContext";
const { height } = Dimensions.get("window");

export const InventoryItem = ({
  item,
  deleteAction,
  onEdit,
}: {
  item: Item;
  deleteAction: () => void;
  onEdit: () => void;
}) => {
  if (item.id === -1) return <View style={{ ...styles.item }} />;

  return (
    <TouchableOpacity
      onPress={onEdit}
      style={[styles.item, styles.itemContainer]}
    >
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAction}>
        <Image style={styles.deleteButtonImage} source={DeleteButton} />
      </TouchableOpacity>
      <Image style={{ ...styles.image }} source={{ uri: item.photo }} />
      <View style={styles.itemBottomContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemPrice}>€ {item.purchasePrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 10,
    alignItems: "center",
    height: height / 3,
    shadowColor: "black",
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    elevation: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 999,
  },
  deleteButtonImage: { width: 35, height: 35 },
  image: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    aspectRatio: 1,
  },
  itemBottomContainer: {
    flex: 1,
    width: "100%",
    padding: 15,
    alignContent: "center",
    justifyContent: "space-around",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  itemTitle: {
    fontSize: 20,
  },
  itemPrice: {
    fontSize: 16,
  },
});
