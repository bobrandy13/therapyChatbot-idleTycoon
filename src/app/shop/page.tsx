"use client";
import React from "react";
import { items } from "~/app/shop/items";
import Navbar from "~/app/components/Navbar";
import ItemComponent from "../components/ItemComponent";
import SelectedItem from "../components/SelectedItem";
import type Item from "~/server/tyoes/itemType";

export default function Shop() {
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const setSelectedItemHandler = (item: Item) => {
    setSelectedItem(item);
  };
  return (
    <div className={"flex h-screen min-h-screen w-screen flex-col"}>
      <Navbar />
      {/* <div className="h-24 w-24 bg-slate-200">Welcome to my shop</div> */}
      <div
        className={
          "mt-14 flex h-full w-full flex-grow flex-col items-center justify-center p-4"
        }
      >
        <SelectedItem item={selectedItem} />
        <div
          className={
            "overflow-x-none m-10 flex h-1/2 w-full flex-grow items-center justify-stretch overflow-y-hidden rounded-xl bg-neutral p-2"
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
                setItem={setSelectedItemHandler}
              ></ItemComponent>
            );
          })}
        </div>
      </div>
    </div>
  );
}
