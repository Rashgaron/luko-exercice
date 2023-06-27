import react from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

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
  const renderItem = ({ item }: { item: Item }) => {
    if (item.id === -1) return <View style={{ ...styles.item }} />;

    return (
      <View style={[styles.item, styles.itemContainer]}>
        <Image style={{ ...styles.image }} source={{ uri: item.photo }} />
        <View style={styles.itemBottomContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemPrice}>€ {item.purchasePrice}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      data={calculateData(items)}
      renderItem={renderItem}
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
