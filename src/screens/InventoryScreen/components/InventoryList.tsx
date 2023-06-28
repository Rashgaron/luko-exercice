import react from "react";
//@ts-ignore
import DeleteButton from "../../../../assets/close.png";
import { FlatList } from "react-native";
import { Item, useInventoryDispatch } from "../../../context/InventoryContext";
import { useNavigation } from "@react-navigation/native";
import { InventoryItem } from "./InventoryItem";

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
    dispatch({ type: "setItemToEdit", payload: { id } });
    navigation.navigate("AddItem");
  };

  const onDelete = (id: number) => {
    dispatch({ type: "remove", payload: { id } });
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      data={calculateData(items)}
      renderItem={(item) => (
        <InventoryItem
          {...item}
          deleteAction={() => onDelete(item.item.id)}
          onEdit={() => editItem(item.item.id)}
        />
      )}
    />
  );
};
