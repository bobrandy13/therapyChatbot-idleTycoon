"use client";
import * as React from "react";
import Image from "next/image";
import type Item from "~/server/tyoes/itemType";

function ItemComponent({
  item,
  index,
  setItem,
}: {
  item: Item;
  index: number;
  setItem: (item: Item) => void;
}) {
  return (
    //     make it a card with width and do not use flex col
    <div
      className="card m-3 h-96 w-96 min-w-72 bg-base-100 shadow-xl hover:bg-base-200"
      onClick={() => {
        // handleClick(item);
        setItem(item);
      }}
      key={index}
    >
      <figure className="px-10 pt-10">
        <Image
          width={200}
          height={200}
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.description}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => localStorage.setItem("cat_background", "true")}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ItemComponent;
