import * as React from "react";
import type Item from "~/server/tyoes/itemType";

const BASE_CLASS = `m-10 flex h-1/4 mt-4 flex-grow flex-row justify-stretch overflow-x-auto rounded-xl bg-neutral p-4`;

function SelectedItem({ item }: { item: Item | null }) {
  if (!item)
    return (
      <div className={`${BASE_CLASS}`}>
        <div className="text-gray-white p-4 text-center text-2xl">
          <p>Select an item to view its properties</p>
        </div>
      </div>
    );

  return (
    <div
      className={`${BASE_CLASS} overflow-hidden rounded-xl text-white shadow-md`}
    >
      <div className="md:flex">
        <div className="p-8">
          <h1 className="mt-1 block text-lg font-medium leading-tight hover:underline">
            {item.name}
          </h1>
          <p className="mt-2 text-white">{item?.description}</p>
          <div className="mt-4 w-full h-full">
            <div className={"relative bottom-0"}>
              <span className="text-2xl font-semibold text-indigo-100">
                ${item?.price}
              </span>
              <button className="float-right rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedItem;
