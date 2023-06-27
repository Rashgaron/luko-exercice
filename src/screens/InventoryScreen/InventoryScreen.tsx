import { StyleSheet, View } from "react-native";
import { Title } from "../../components/Title";
import { RootTabScreenProps } from "../../navigation/types";
import { colors } from "../../theme/colors";
import { InventoryList, Item } from "./components/InventoryList";
import { useEffect } from "react";

export default function InventoryScreen({
  navigation,
  route,
}: RootTabScreenProps<"Inventory">) {
  const handleAddButtonPress = () => navigation.navigate("AddItem");

  useEffect(() => {
    handleAddButtonPress();
  }, []);

  return (
    <View style={styles.container}>
      <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
      <InventoryList items={items} />
    </View>
  );
}

const items: Item[] = [
  {
    id: 1,
    name: "Cartier ring",
    purchasePrice: 5780,
    type: "JEWELRY",
    description: "Gift from my grandfather",
    photo: "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
  },
  {
    id: 2,
    name: "Guitar",
    purchasePrice: 850,
    type: "MUSIC_INSTRUMENT",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
    id: 3,
    name: "Macbook Pro",
    purchasePrice: 2500,
    type: "ELECTRONICS",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
    id: 4,
    name: "Macbook Pro",
    purchasePrice: 2500,
    type: "ELECTRONICS",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
    id: 5,
    name: "Macbook Pro",
    purchasePrice: 2500,
    type: "ELECTRONICS",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
});
