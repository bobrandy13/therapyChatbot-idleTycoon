import React from "react";
import {items} from "~/app/shop/items";
import Navbar from "~/app/components/Navbar";

export default function Shop() {
    return (
        <div className={"flex flex-col w-screen min-h-screen"}>
            <Navbar/>
            <div className={"flex flex-grow justify-center items-end"}>
                <div className={"w-screen m-10 h-96 p-4 rounded-xl bg-neutral flex flex-row overflow-x-auto"}>
                    {/*    map for as many items that you have to sell */}
                    {items.map((item, index) => {
                        // return a card that displays the item
                        return (
                            //     make it a card with width and do not use flex col
                            <div className="card w-96 bg-base-100 shadow-xl" key={index}>
                                <figure className="px-10 pt-10">
                                    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                         alt="Shoes" className="rounded-xl"/>
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{item.name}</h2>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    );
}