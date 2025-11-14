import React from "react";
import attractions from "./img/attractions.png";
import book4 from "./img/book_4.png";
import forest from "./img/forest.png";
import forkSpoon from "./img/fork_spoon.png";
import search from "./img/search.png";
import shoppingCart from "./img/shopping_cart.png";
import starShine from "./img/star_shine.png";

export const Screen = (): JSX.Element => {
    const categories = [
        {
            id: 1,
            icon: forkSpoon,
            label: "グルメ・カフェ",
            alt: "Fork spoon",
        },
        {
            id: 2,
            icon: forest,
            label: "自然・公園",
            alt: "Forest",
        },
        {
            id: 3,
            icon: book4,
            label: "歴史・文化",
            alt: "Book",
        },
        {
            id: 4,
            icon: shoppingCart,
            label: "ショッピング",
            alt: "Shopping cart",
        },
        {
            id: 5,
            icon: attractions,
            label: "体験",
            alt: "Attractions",
        },
        {
            id: 6,
            icon: starShine,
            label: "その他",
            alt: "Star shine",
        },
    ];

    return (
        <div className="bg-[#f9f7f1] transition-all duration-[0.2s] ease-[ease] w-full min-w-[1200px] min-h-[1920px] flex flex-col">
            <header className="w-[1200px] h-[250px] flex bg-[#8b5e3c]">
                <h1 className="mt-[87px] w-[747px] h-[75px] ml-[226px] text-white text-[64px] whitespace-nowrap flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                    アプリ名
                </h1>
            </header>

            <section
                className="ml-[100px] w-[999px] h-[166px] mt-[94px] gap-4 flex flex-col bg-white border border-solid border-[#c84c24]"
                aria-label="現在地情報"
            >
                <div className="w-[433px] h-[75px] text-black text-[32px] flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                    現在地：〇〇
                </div>

                <div className="w-[433px] h-[75px] text-black text-[32px] flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                    説明文
                </div>
            </section>

            <nav
                className="ml-[100px] mt-[154px] w-[1000px] flex flex-col gap-[53px]"
                aria-label="カテゴリー"
            >
                <div className="w-[1000px] flex gap-[60px]">
                    {categories.slice(0, 2).map((category) => (
                        <button
                            key={category.id}
                            className="w-[470px] h-[250px] flex flex-col gap-[18px] bg-stone-50 border border-solid border-[#c84c24] hover:bg-stone-100 transition-colors cursor-pointer"
                            aria-label={category.label}
                        >
                            <img
                                className="ml-[155px] w-40 h-40 aspect-[1]"
                                alt={category.alt}
                                src={category.icon}
                            />

                            <div className="ml-[82px] w-[305px] h-[46px] text-black text-[40px] whitespace-nowrap flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                                {category.label}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="w-[1000px] flex gap-[60px]">
                    {categories.slice(2, 4).map((category) => (
                        <button
                            key={category.id}
                            className="w-[470px] h-[250px] gap-[18px] flex flex-col bg-white border border-solid border-[#c84c24] hover:bg-stone-50 transition-colors cursor-pointer"
                            aria-label={category.label}
                        >
                            <img
                                className="ml-[155px] w-40 h-40 aspect-[1]"
                                alt={category.alt}
                                src={category.icon}
                            />

                            <div className="ml-[82px] w-[305px] h-[46px] text-black text-[40px] whitespace-nowrap flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                                {category.label}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="ml-[1px] w-[1000px] flex gap-[60px]">
                    {categories.slice(4, 6).map((category) => (
                        <button
                            key={category.id}
                            className="w-[470px] h-[250px] gap-[18px] flex flex-col bg-white border border-solid border-[#c84c24] hover:bg-stone-50 transition-colors cursor-pointer"
                            aria-label={category.label}
                        >
                            <img
                                className="ml-[155px] w-40 h-40 aspect-[1]"
                                alt={category.alt}
                                src={category.icon}
                            />

                            <div className="ml-[82px] w-[305px] h-[46px] text-black text-[40px] whitespace-nowrap flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                                {category.label}
                            </div>
                        </button>
                    ))}
                </div>
            </nav>

            <button
                className="ml-[200px] w-[800px] h-40 mt-[120px] flex bg-white border border-solid border-[#c84c24] hover:bg-stone-50 transition-colors cursor-pointer"
                aria-label="検索"
            >
                <div className="mt-[15px] w-[533px] h-[129px] ml-[133px] flex">
                    <img
                        className="mt-6 w-[82px] h-[82px] ml-[185px] aspect-[1]"
                        alt="Search"
                        src={search}
                    />

                    <div className="flex items-center justify-center mt-[30px] w-[142px] h-[69px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[64px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        検索
                    </div>
                </div>
            </button>
        </div>
    );
};
