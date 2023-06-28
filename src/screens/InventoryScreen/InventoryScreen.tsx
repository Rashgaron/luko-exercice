import { StyleSheet, View } from "react-native";
import { Title } from "../../components/Title";
import { RootTabScreenProps } from "../../navigation/types";
import { colors } from "../../theme/colors";
import { InventoryList } from "./components/InventoryList";
import { useInventory } from "../../context/InventoryContext";

export default function InventoryScreen({
  navigation,
  route,
}: RootTabScreenProps<"Inventory">) {
  const { items } = useInventory() as any;
  const handleAddButtonPress = () => navigation.navigate("AddItem");

  return (
    <View style={styles.container}>
      <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
      <InventoryList items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
});
