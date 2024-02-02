import { render, screen } from "@testing-library/react";
import SelectedItem from "./SelectedItem";

describe("SelectedItem", () => {
  test("renders item name", () => {
    const item = {
      name: "Test Item",
      description: "Test description",
      price: 10,
    };

    render(<SelectedItem item={item} />);

    const itemName = screen.getByText("Test Item");
    expect(itemName).toBeInTheDocument();
  });

  test("renders item description", () => {
    const item = {
      name: "Test Item",
      description: "Test description",
      price: 10,
    };

    render(<SelectedItem item={item} />);

    const itemDescription = screen.getByText("Test description");
    expect(itemDescription).toBeInTheDocument();
  });

  test("renders item price", () => {
    const item = {
      name: "Test Item",
      description: "Test description",
      price: 10,
    };

    render(<SelectedItem item={item} />);

    const itemPrice = screen.getByText("$10");
    expect(itemPrice).toBeInTheDocument();
  });
});
