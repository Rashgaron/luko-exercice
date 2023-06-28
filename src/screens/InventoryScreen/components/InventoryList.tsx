import react from "react";
//@ts-ignore
import DeleteButton from "../../../../assets/close.png";
import { TouchableOpacity } from "react-native";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useInventoryDispatch } from "../../../context/InventoryContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export interface Item {
  id: number;
  name: string;
  purchasePrice: number;
  type: string;
  description?: string;
  photo?: string;
}

interface Props {
  items: Item[];
}

const calculateData = (items: Item[]) => {
  if (items.length % 2 === 0) {
    return items;
  } else {
    return [...items, { id: -1, name: "", purchasePrice: -1, type: "" }];
  }
};

export const InventoryList = ({ items }: Props) => {
  const navigation = useNavigation();
  const dispatch = useInventoryDispatch() as any;

  const editItem = (id: number) => {
    dispatch({ type: "setItemToEdit", payload: { id } })
    navigation.navigate("AddItem");    
  }

  const RenderItem = ({
    item,
    deleteAction,
  }: {
    item: Item;
    deleteAction: () => void;
  }) => {
    if (item.id === -1) return <View style={{ ...styles.item }} />;

    return (
      <TouchableOpacity
        onPress={()=>editItem(item.id)}
        style={[styles.item, styles.itemContainer]}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            zIndex: 1,
            backgroundColor: "white",
            borderRadius: 999,
          }}
          onPress={deleteAction}
        >
          <Image style={{ width: 35, height: 35 }} source={DeleteButton} />
        </TouchableOpacity>
        <Image style={{ ...styles.image }} source={{ uri: item.photo }} />
        <View style={styles.itemBottomContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemPrice}>€ {item.purchasePrice}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onDelete = (id: number) => {
    console.log(id);
    dispatch({ type: "remove", payload: { id } });
  };
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      data={calculateData(items)}
      renderItem={(item) => (
        <RenderItem {...item} deleteAction={() => onDelete(item.item.id)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
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
