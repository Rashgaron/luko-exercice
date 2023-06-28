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
    items,
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
    purchasePrice: 2000,
    type: "ELECTRONICS",
    photo:
      "https://reviewed-com-res.cloudinary.com/image/fetch/s--Q-ZGPp9y--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_1200/https://reviewed-production.s3.amazonaws.com/1607081088000/DSC_0877.jpg",
  },
];
