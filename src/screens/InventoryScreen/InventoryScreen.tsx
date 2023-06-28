import { StyleSheet, View } from "react-native";
import { Title } from "../../components/Title";
import { RootTabScreenProps } from "../../navigation/types";
import { colors } from "../../theme/colors";
import { InventoryList, Item } from "./components/InventoryList";
import { useEffect } from "react";
import { useInventory } from "../../context/InventoryContext";

export default function InventoryScreen({
  navigation,
  route,
}: RootTabScreenProps<"Inventory">) {
  const {items, currentPrice} = useInventory() as any; 
  const handleAddButtonPress = () => navigation.navigate("AddItem");
  
  useEffect(() => {
    console.log(currentPrice);
  }, [items]);

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
