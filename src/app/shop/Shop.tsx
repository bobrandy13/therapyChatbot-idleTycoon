import React, { useState} from "react";
import { items } from "~/app/shop/items";
import Navbar from "~/app/components/Navbar";
import ItemComponent from "../components/ItemComponent";
import SelectedItem from "../components/SelectedItem";

export default function Shop() {
  const [selectedItem, setSelectedItem] = useState(items[0]);



  return (
    <div className={"flex min-h-screen w-screen flex-col"}>
      <Navbar />
      <div className="m-4 flex w-screen justify-center"></div>
      <div className={"flex flex-grow items-end justify-center"}>
        <SelectedItem item={selectedItem ?? null} />
        <div
          className={
            "m-10 flex h-72 w-screen flex-grow flex-row justify-stretch overflow-x-auto rounded-xl bg-neutral p-4"
          }
        >
          {/*    map for as many items that you have to sell */}
          {items.slice(0, 10).map((item, index) => {
            // return a card that displays the item
            return (
              <ItemComponent
                item={item}
                index={index}
                key={index}
                setItem={setSelectedItem}
              ></ItemComponent>
            );
          })}
        </div>
      </div>
    </div>
  );
}
