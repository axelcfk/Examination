import React from "react";
import { useState } from "react";
import { Wonton, Dip, Drink } from "../types/menuType";
import Eta from "./eta";
import { MenuItem } from "../types/menuType";

type CartModalProps = {
  getTotalPrice: () => number;
  selectedItems: readonly number[];
  menu: readonly Wonton[];
  dip: readonly Dip[];
  drink: readonly Drink[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function CartModal({
  getTotalPrice,
  selectedItems,
  menu,
  dip,
  drink,
  setSelectedItems,
}: CartModalProps) {
  const selectedMenuItems = menu.filter((item) =>
    selectedItems.includes(item.id)
  );
  const selectedDipItems = dip.filter((item) =>
    selectedItems.includes(item.id)
  );
  const selectedDrinkItems = drink.filter((item) =>
    selectedItems.includes(item.id)
  );

  const [takeMyMoneyCLicked, setTakeMyMoneyCLicked] = useState<boolean>(false);
  const [eta, setEta] = useState<string>("");

  async function handleModalClick() {
    try {
      const itemIds = Array.from(selectedItems);

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      setTakeMyMoneyCLicked(true);
      setEta(data.eta);
    } catch (err) {
      console.error("Error placing order:", err);
    }
  }

  function handleAdd(itemId: number): void {
    setSelectedItems((prev) => [...prev, itemId]);
  }

  function handleRemove(itemId: number): void {
    setSelectedItems((prev) => {
      const index = prev.lastIndexOf(itemId);
      if (index === -1) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  const renderItemRow = (item: MenuItem, index: number) => (
    <div
      key={item.id}
      className={`h-[89px] p-[16px] gap-[8px] w-[390px] flex-nowrap transition-colors duration-200 ${
        selectedItems.length - 1 !== index &&
        "border-b-[1px] border-solid border-[#3531313D]"
      } `}
    >
      <div className="flex justify-between h-[26px] gap-[8px]">
        <h3 className="font-bold text-[#353131] text-[22px]">{item.name}</h3>
        <div className="border-b-[#353131] border-t-0 border-l-0 border-r-0 border-dotted border-2 flex-grow" />
        <h3 className="text-[#353131] text-[22px] font-bold">
          {item.price} SEK
        </h3>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <button
          onClick={() => handleRemove(item.id)}
          className="rounded-full bg-[#3531313D] w-[24px] h-[24px] flex items-center justify-center"
        >
          -
        </button>
        <p className="text-[14px] text-[#353131] font-medium">
          {Array.from(selectedItems).filter((id) => id === item.id).length}{" "}
          stycken
        </p>
        <button
          onClick={() => handleAdd(item.id)}
          className="rounded-full bg-[#3531313D] w-[24px] h-[24px] flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 h-[1068px] w-[390px] bg-gray-700/25 z-40 flex justify-center">
      <div className="h-[844px] w-[390px] bg-[#EEEEEE] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full ">
          {/* <div className="h-[462.2px]">
            {selectedMenuItems.map((item, index) => (
              <div
                key={index}
                className={` h-[89px] p-[16px] gap-[8px] w-[390px]  flex-nowrap transition-colors duration-200 `}
              >
                <div className="flex justify-between h-[26px] gap-[8px]">
                  <h3 className="font-bold text-[#353131] text-[22px]">
                    {item.name}
                  </h3>
                  <div className="border-b-[#353131] border-t-0 border-l-0 border-r-0 border-dotted border-2 flex-grow "></div>
                  <h3 className=" text-[#353131] text-[22px] font-bold">
                    {item.price} SEK
                  </h3>
                </div>
                <div className="flex">
                  <button className="rounded-full bg-[#3531313D] w-[24px] h-[24px]">
                    -
                  </button>
                  <p className="text-[14px]">x stycken</p>
                  <button className="rounded-full bg-[#3531313D] w-[24px] h-[24px]">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          <div className="h-[462.2px] overflow-y-auto">
            {selectedMenuItems.map(renderItemRow)}
            {selectedDipItems.map(renderItemRow)}
            {selectedDrinkItems.map(renderItemRow)}
          </div>
          <div className="rounded-[4px] p-[16px] gap-[8px] bg-[#3531313D] w-[358px] h-[78px]">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[#353131] font-sans text-[22px] font-semibold">
                  TOTALT
                </h3>
                <p className="font-sans text-[14px] font-medium">
                  inkl 20% moms
                </p>
              </div>
              <h3 className="text-[32px] font-semibold font-sans">
                {getTotalPrice()} SEK
              </h3>
            </div>
          </div>

          <button
            onClick={handleModalClick}
            className="rounded-[4px] p-[16px] gap-[8px] bg-[#353131] w-[358px] h-[78px] font-semibold font-sans text-[24px] text-[#F4F3F1F0] mt-4"
          >
            TAKE MY MONEY!
          </button>
          <button className="rounded-[4px] p-[16px] gap-[8px]"></button>
        </div>
      </div>
      {takeMyMoneyCLicked && <Eta eta={eta} />}
    </div>
  );
}
