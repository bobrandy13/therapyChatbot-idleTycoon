"use client";
import React from "react";
import { items } from "~/app/shop/items";
import Navbar from "~/app/components/Navbar";
import ItemComponent from "../components/ItemComponent";
import SelectedItem from "../components/SelectedItem";
import type Item from "~/server/tyoes/itemType";
import { set } from "zod";

export default function Shop() {
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const setSelectedItemHandler = (item: Item) => {
    setSelectedItem(item);
  };
  return (
    <div className={"flex h-screen min-h-screen w-screen flex-col"}>
      <Navbar />
      <div className="h-24 w-24 bg-slate-200">Welcome to my shop</div>
      <div className={"flex h-full flex-grow items-end justify-center p-4"}>
        <SelectedItem item={selectedItem} />
        <div
          className={
            "m-10 flex h-1/2 w-screen flex-grow flex-row  justify-stretch overflow-x-auto overflow-y-auto rounded-xl bg-neutral p-4"
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