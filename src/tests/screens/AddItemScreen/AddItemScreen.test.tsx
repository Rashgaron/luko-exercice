import { fireEvent, render } from "@testing-library/react-native";
import AddItemScreen from "../../../screens/AddItemScreen/AddItemScreen";
import {
  useInventoryDispatch,
  useInventory,
} from "../../../context/InventoryContext";
import { ImagePicker } from "../../../sdk/ImagePicker";

const screenId = "AddItemScreen";

const mockDispatch = jest.fn();

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  return {
    KeyboardAwareScrollView: jest
      .fn()
      .mockImplementation(({ children }) => children),
  };
});

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an AddItemScreen component", () => {
  describe("When filling the form", () => {
    describe("And the form is valid", () => {
      it("Should call the dispatch function to add the new item", async () => {
        await fillForm();

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
    describe("And the form is not valid", () => {
      it("Should not call the dispatch function to add the new item", async () => {
        const { getByText } = render(
          <AddItemScreen
            navigation={mockNavigation as any}
            route={undefined as any}
          />
        );
        const addButton = getByText("Add");

        await fireEvent.press(addButton);

        expect(mockDispatch).not.toHaveBeenCalled();
        expect(mockNavigation.goBack).not.toHaveBeenCalled();
      });
      it("Should not call the function to add new item if the price is over 40000", async () => {
        // @ts-ignore
        useInventory.mockImplementation(() => ({
          items: [],
          currentPrice: 40000,
          itemToEdit: null,
        }));
        await fillForm();
        expect(mockDispatch).not.toHaveBeenCalled();
        expect(mockNavigation.goBack).not.toHaveBeenCalled();
      });

      it("Should not call the function to add new item if the name is missing", async () => {
        await fillForm("");
        expect(mockDispatch).not.toHaveBeenCalled();
        expect(mockNavigation.goBack).not.toHaveBeenCalled();
      });
      it("Should not call the function to add new item if the price is missing", async () => {
        await fillForm("Test name", "");
        expect(mockDispatch).not.toHaveBeenCalled();
        expect(mockNavigation.goBack).not.toHaveBeenCalled();
      });
      it("Should not call the function to add new item if the image is missing", async () => {
        // @ts-ignore
        ImagePicker.takePhoto.mockImplementation(() => Promise.resolve(null));
        await fillForm();
        expect(mockDispatch).not.toHaveBeenCalled();
        expect(mockNavigation.goBack).not.toHaveBeenCalled();
      });
    });
  });
});

const fillForm = async (
  formName = "Test name",
  formValue = "10",
  formDescription = "Test description"
) => {
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

  fireEvent.changeText(name, formName);
  fireEvent.changeText(value, formValue);
  fireEvent.changeText(description, formDescription);
  await fireEvent.press(addPhotoButton);

  const openCamera = getByText("Open Camera");
  await fireEvent.press(openCamera);

  await fireEvent.press(addButton);
};
