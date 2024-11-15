"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Wonton, Dip, Drink } from "../types/menuType";
import CartModal from "../components/cartmodal";

export default function Menu() {
  const [menu, setMenu] = useState<Wonton[]>([]);
  const [dip, setDip] = useState<Dip[]>([]);
  const [drink, setDrink] = useState<Drink[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleModalClick() {
    setButtonClicked(!buttonClicked);
  }

  function handleItemCLicked(itemID: number): void {
    setSelectedItems((prev) => {
      if (prev.includes(itemID)) {
        return prev.filter((id) => id !== itemID);
      } else {
        return [...prev, itemID];
      }
    });
  }

  function getTotalPrice(): number {
    return selectedItems.reduce((total, selectedId) => {
      const menuItem = menu.find((item) => item.id === selectedId);
      const dipItem = dip.find((item) => item.id === selectedId);
      const drinkItem = drink.find((item) => item.id === selectedId);

      const price = menuItem?.price || dipItem?.price || drinkItem?.price || 0;

      return total + price;
    }, 0);
  }
  async function getMenuItems(): Promise<void> {
    try {
      const response = await fetch("/api/wonton");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          text: errorText,
        });
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Menu data received:", data);
      setMenu(data.items);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  }

  async function getDipItem(): Promise<void> {
    try {
      const response = await fetch("/api/dip");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          text: errorText,
        });
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Dip data is:", data.items[0].price);
      setDip(data.items);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  }

  async function getDrinkItem(): Promise<void> {
    try {
      const response = await fetch("/api/drink");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          text: errorText,
        });
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Menu data received:", data);
      setDrink(data.items);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMenuItems();
    getDipItem();
    getDrinkItem();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 z-0 bg-[#489078] h-[1068px] w-[390px]">
      <button
        onClick={handleModalClick}
        className="flex  justify-center items-center absolute top-[17px] left-[310px] h-[64px] w-[64px] rounded-[4px] bg-[#F4F3F1F0]"
      >
        <img
          className="h-[30.72px] w-[31.99px] relative "
          src="/cart.png"
          alt="cart-icon"
        />
        <div className="bg-[#EB5757] rounded-full h-[24px] w-[24px] absolute top-[-10px] p-[10px] right-[-10px] flex justify-center items-center text-[#F4F3F1F0] font-mono font-bold">
          {selectedItems.length}
        </div>
      </button>
      <div className="h-[851.2px] mt-[112px] gap-[16px] flex flex-col justify-between">
        <h1 className="w-[104px] h-[24px] text-[32px] text-[#F4F3F1F0] font-bold font-sans">
          Meny
        </h1>
        <div className="bg-[#605858] w-[358px] h-[451.2px] rounded-[8px] font-sans">
          {menu.map((item, index) => (
            <button
              onClick={() => handleItemCLicked(item.id)}
              key={index}
              className={`h-[89px] p-[16px] gap-[8px] w-full flex-nowrap ${
                menu.length - 1 !== index && "border-b border-dotted"
              } ${
                selectedItems.includes(item.id) ? "bg-[#353131]" : ""
              } transition-colors duration-200 ${
                index === 0 ? "rounded-t-[8px]" : ""
              } ${index === menu.length - 1 ? "rounded-b-[8px] " : ""}`}
            >
              <div className="flex justify-between h-[26px] gap-[8px]">
                <h3 className="font-bold text-[#F4F3F1F0] text-[22px]">
                  {item.name}
                </h3>
                <div className="border-b-[#F4F3F1F0] border-t-0 border-l-0 border-r-0 border-dotted border-2 flex-grow "></div>
                <h3 className=" text-[#F4F3F1F0] text-[22px] font-bold">
                  {item.price} SEK
                </h3>
              </div>
              <p className="h-[23px]  text-[#F4F3F1F0] text-[14px] font-bold mt-2 text-left">
                {item.ingredients?.join(", ")}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-[#605858] w-[358px] h-[164px] rounded-[8px] font-sans p-[16px]">
          <div className="gap-[8px]">
            <div className="flex justify-between">
              <h3 className="text-[#F4F3F1F0] text-[22px] font-bold">DIPSÅS</h3>
              <div className="border-b-[#F4F3F1F0] border-t-0 border-l-0 border-r-0 border-dotted border-2 flex-grow"></div>
              <h3 className="text-[#F4F3F1F0] text-[22px] font-bold">19 SEK</h3>
            </div>
          </div>

          <div className="flex flex-wrap w-full gap-[8px] mt-4">
            {dip.map((item, index) => (
              <button
                onClick={() => handleItemCLicked(item.id)}
                key={index}
                className={`text-[#F4F3F1F0] font-bold h-[33px] w-[92px] text-[14px] pl-[12px] pr-[12px] pt-[8px] pb-[8px] font-sans rounded-[4px] truncate whitespace-nowrap transition-colors duration-200 ${
                  selectedItems.includes(item.id)
                    ? "bg-[#353131]"
                    : "bg-[#F1F0EC3D]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#605858] w-[358px] h-[164px] rounded-[8px] font-sans p-[16px]">
          <div className="gap-[8px]">
            <div className="flex justify-between">
              <h3 className="text-[#F4F3F1F0] text-[22px] font-bold">DRICKA</h3>
              <div className="border-b-[#F4F3F1F0] border-t-0 border-l-0 border-r-0 border-dotted border-2 flex-grow"></div>
              <h3 className="text-[#F4F3F1F0] text-[22px] font-bold">19 SEK</h3>
            </div>
          </div>

          <div className="flex flex-wrap w-full gap-[8px] mt-4">
            {drink.map((item, index) => (
              <button
                onClick={() => handleItemCLicked(item.id)}
                key={index}
                className={`text-[#F4F3F1F0] font-bold h-[33px] w-[92px] text-[14px] pl-[12px] pr-[12px] pt-[8px] pb-[8px] font-sans rounded-[4px] truncate whitespace-nowrap transition-colors duration-200 ${
                  selectedItems.includes(item.id)
                    ? "bg-[#353131]"
                    : "bg-[#F1F0EC3D]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {buttonClicked && (
        <CartModal
          getTotalPrice={getTotalPrice}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          menu={menu}
          dip={dip}
          drink={drink}
        />
      )}
    </div>
  );
}
