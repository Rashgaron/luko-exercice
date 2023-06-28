export const InventoryReducer = (state: any, action: any) => {
  console.log(action);
  let index = -1;
  switch (action.type) {
    case "add":
      index = state.items.findIndex(
        (item: any) => item.id === state.itemToEdit.id
      );

      console.log("index", index)
      if (index !== -1) {
        return {
          ...state,
          currentPrice:
            Number(state.currentPrice) -
            Number(state.itemToEdit.purchasePrice) +
            Number(action.payload.purchasePrice),
          items: [
            ...state.items.slice(0, index),
            action.payload,
            ...state.items.slice(index + 1),
          ],
          itemToEdit: null
        };
      } else
        return {
          ...state,
          items: [action.payload, ...state.items],
          currentPrice: Number(state.currentPrice) + Number(action.payload.purchasePrice),
        };
    case "remove":
      index = state.items.findIndex(
        (item: any) => item.id === action.payload.id
      );
      return {
        ...state,
        currentPrice: state.currentPrice - state.items[index].purchasePrice,
        items: state.items.filter((item: any) => item.id !== action.payload.id),
      };
    case "setItemToEdit":
      console.log("setItemToEdit");
      return {
        ...state,
        itemToEdit: state.items.find(
          (item: any) => item.id === action.payload.id
        ),
      };
    default:
      console.log("default");
      return state;
  }
};
