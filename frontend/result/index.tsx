import React from "react";

interface LocationItem {
    id: number;
    name: string;
    distance: string;
}

export const Screen = (): JSX.Element => {
    const locationItems: LocationItem[] = [
        { id: 1, name: "〇〇商店", distance: "現在地から：〇〇m" },
        { id: 2, name: "〇〇神社", distance: "現在地から：〇〇m" },
        { id: 3, name: "〇〇寺", distance: "現在地から：〇〇m" },
        { id: 4, name: "〇〇公園", distance: "現在地から：〇〇m" },
        { id: 5, name: "〇〇公園", distance: "現在地から：〇〇m" },
    ];

    return (
        <div className="bg-[#f9f7f1] w-full min-w-[1200px] min-h-[1920px] flex flex-col">
            <header className="w-[1200px] h-[250px] flex bg-[#8b5e3c]">
                <h1 className="mt-[87px] w-[747px] h-[75px] ml-[226px] text-white text-[64px] whitespace-nowrap flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                    アプリ名
                </h1>
            </header>

            <div className="ml-[100px] mt-[94px] w-[999px] h-[166px] bg-white border border-solid border-[#c84c24]" />

            {locationItems.map((item, index) => (
                <div
                    key={item.id}
                    className={`${index === 0 ? "mt-[154px]" : "mt-[83px]"} ml-[99px] w-[999px] flex`}
                >
                    <article
                        className={`w-[999px] h-[166px] relative ${index === 0 ? "bg-stone-50" : "bg-white"} overflow-hidden border border-solid border-[#c84c24]`}
                    >
                        <div className="absolute top-0 left-[166px] w-[833px] h-[102px] text-black text-5xl flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                            {item.name}
                        </div>

                        <div className="absolute top-[102px] left-[166px] w-[833px] h-[67px] flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-[#6b6b6b] text-[26px] text-center tracking-[0] leading-[normal]">
                            {item.distance}
                        </div>

                        <div className="absolute top-0 left-0 w-[166px] h-[166px] flex bg-[#00000080]">
                            <div className="flex items-center justify-center mt-[63px] w-[92px] h-[39px] ml-[37px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[32px] text-center tracking-[0] leading-[normal]">
                                image
                            </div>
                        </div>
                    </article>
                </div>
            ))}
        </div>
    );
};
