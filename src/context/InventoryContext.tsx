import { createContext, useReducer, useContext } from "react";
import { InventoryReducer } from "./InventoryReducer";

const InventoryContext = createContext(null);
const InventoryDispatchContext = createContext(null);

export interface Item {
  id: number;
  name: string;
  purchasePrice: number;
  type: string;
  description?: string;
  photo?: string;
}
export interface IInventoryState {
  items: Item[];
  currentPrice: number;
  itemToEdit: Item | null;
  error: string;
}

export const InventoryProvider = ({ children }: any) => {
  const [inventory, dispatch] = useReducer(InventoryReducer, {
    items: items,
    currentPrice: 16500,
    itemToEdit: null,
    error: "",
  });

  return (
    <InventoryContext.Provider value={inventory}>
      <InventoryDispatchContext.Provider value={dispatch as any}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
export const useInventoryDispatch = () => {
  return useContext(InventoryDispatchContext);
};

const items: Item[] = [
  {
    id: 1,
    name: "Cartier ring",
    purchasePrice: 5000,
    type: "JEWELRY",
    description: "Gift from my grandfather",
    photo: "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
  },
  {
    id: 2,
    name: "Guitar",
    purchasePrice: 500,
    type: "MUSIC_INSTRUMENT",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
    id: 3,
    name: "Macbook Pro",
    purchasePrice: 10000,
    type: "ELECTRONICS",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
    id: 4,
    name: "Macbook Pro",
    purchasePrice: 500,
    type: "ELECTRONICS",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
  {
    id: 5,
    name: "Macbook Pro",
    purchasePrice: 500,
    type: "ELECTRONICS",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
  },
];
