import React from "react";

export default function Eta({ eta }: { eta: string }) {
  return (
    <div className="fixed inset-0 h-[1068px] w-[390px] bg-gray-700/25 z-40 flex justify-center">
      <div className="h-[844px] w-[390px] bg-[#605858] flex flex-col justify-center items-center ">
        <img className="h-[362px]" src="boxtop.png" alt="box" />
        <div className="w-[326px]  h-[164px] flex justify-center items-center flex-col ">
          <h2 className="text-[32px] font-sans font-bold text-center text-[#F4F3F1F0]">
            DINA WONTONS TILLAGAS!
          </h2>
          <h3 className="text-[26px] font-semibold text-[#F4F3F1F0] text-center">
            ETA {eta} MIN
          </h3>
          <p className="text-[15px] text-[#F4F3F1F0]">#xxxxxx</p>
        </div>

        <div className="h-[170px] flex flex-col justify-between">
          <button className="bg-[#605858] text-[24px] rounded-[4px] border-[2px] border-[#F4F3F1F0] h-[77px] w-[358px] font-sans font-semibold text-[#F4F3F1F0]">
            SE KVITTO
          </button>
          <button className="bg-[#353131] text-[24px] rounded-[4px] h-[77px] w-[358px] font-sans font-semibold text-[#F4F3F1F0]">
            GÖR EN NY BESTÄLLNING
          </button>
        </div>
      </div>
    </div>
  );
}
