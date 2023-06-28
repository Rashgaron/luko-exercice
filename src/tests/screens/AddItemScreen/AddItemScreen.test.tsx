import { fireEvent, render } from "@testing-library/react-native";
import AddItemScreen from "../../../screens/AddItemScreen/AddItemScreen";
import { useInventoryDispatch } from "../../../context/InventoryContext";

const screenId = "AddItemScreen";

const mockDispatch = jest.fn();

jest.mock("../../../context/InventoryContext", () => ({
  useInventory: jest.fn(() => ({
    items: [],
    currentPrice: 0,
    itemToEdit: null,
  })),
  useInventoryDispatch: jest.fn(() => mockDispatch),
}));

jest.mock("../../../sdk/ImagePicker", () => ({
  ImagePicker: {
    pickImage: jest.fn(() => Promise.resolve({ assets: [{ uri: "test" }] })),
    takePhoto: jest.fn(() => Promise.resolve({ assets: [{ uri: "test" }] })),
  },
}));

const mockNavigation = {
  goBack: jest.fn(),
};

describe("Given an AddItemScreen component", () => {
  describe("When it's rendered", () => {
    it("Should render a main view container", () => {
      const { getByTestId } = render(
        <AddItemScreen navigation={undefined as any} route={undefined as any} />
      );

      getByTestId(screenId);
    });
  });
  describe("When filling the form", () => {
    describe("And the form is valid", () => {
      it("Should call the dispatch function to add the new item", async () => {
        const { getByTestId, getByText, findByText, findByTestId } = render(
          <AddItemScreen
            navigation={mockNavigation as any}
            route={undefined as any}
          />
        );
        const name = getByTestId("Name");
        const value = getByTestId("Value");
        const description = getByTestId("Description");
        const addPhotoButton = getByTestId("AddPhotoButton");
        const addButton = getByText("Add");

        fireEvent.changeText(name, "Test name");
        fireEvent.changeText(value, "10");
        fireEvent.changeText(description, "Test description");
        await fireEvent.press(addPhotoButton);

        const openCamera = getByText("Open Camera");
        await fireEvent.press(openCamera);

        await fireEvent.press(addButton);

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({
          payload: {
            description: "Test description",
            name: "Test name",
            photo: "test",
            purchasePrice: "10",
            type: "",
          },
          type: "add",
        });
        expect(mockNavigation.goBack).toHaveBeenCalled();
      });
    });
  });
});
