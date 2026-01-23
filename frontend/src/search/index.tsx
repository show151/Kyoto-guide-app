
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import attractions from "./img/attractions.png";
import book4 from "./img/book_4.png";
import forest from "./img/forest.png";
import forkSpoon from "./img/fork_spoon.png";
import search from "./img/search.png";
import shoppingCart from "./img/shopping_cart.png";
import starShine from "./img/star_shine.png";

export const Screen = (): JSX.Element => {
    const navigate = useNavigate();
    const [currentAddress, setCurrentAddress] = useState<string>("現在地を取得中...");
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        if (!navigator.geolocation) {
            setCurrentAddress("位置情報がサポートされていません");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ lat: latitude, lng: longitude });

                try {
                    // Use OpenStreetMap Nominatim for reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                    );
                    const data = await response.json();
                    const address = data.address;
                    // Format: City + "周辺"
                    const city = address.city || address.town || address.village || address.county || "不明な地域";
                    setCurrentAddress(`${city}周辺`);
                } catch (error) {
                    console.error("Address fetch failed", error);
                    setCurrentAddress("住所の取得に失敗しました");
                }
            },
            (error) => {
                console.error("Geolocation error", error);
                setCurrentAddress("位置情報の取得に失敗しました");
            }
        );
    }, []);

    const handleSearch = () => {
        const queryParams = new URLSearchParams();
        if (selectedCategories.length > 0) {
            queryParams.set("category", selectedCategories.join(","));
        }
        if (coords) {
            queryParams.set("lat", coords.lat.toString());
            queryParams.set("lng", coords.lng.toString());
        }
        navigate(`/result?${queryParams.toString()}`);
    };

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const categories = [
        {
            id: "グルメ",
            icon: forkSpoon,
            label: "グルメ・カフェ",
            alt: "Fork spoon",
        },
        {
            id: "自然",
            icon: forest,
            label: "自然・公園",
            alt: "Forest",
        },
        {
            id: "歴史を感じられる",
            icon: book4,
            label: "歴史・文化",
            alt: "Book",
        },
        {
            id: "ショッピング",
            icon: shoppingCart,
            label: "ショッピング",
            alt: "Shopping cart",
        },
        {
            id: "体験",
            icon: attractions,
            label: "体験",
            alt: "Attractions",
        },
        {
            id: "その他",
            icon: starShine,
            label: "その他",
            alt: "Star shine",
        },
    ];

    return (
        <div className="bg-[#f9f7f1] transition-all duration-[0.2s] ease-[ease] w-full min-w-[1200px] min-h-[1920px] flex flex-col">
            <header className="w-[1200px] h-[160px] flex bg-[#e94709] relative">
                <button
                    className="absolute left-[40px] top-[50px] w-[60px] h-[60px]"
                    aria-label="戻る"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 12H5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 19L5 12L12 5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1 className="mt-[43px] w-[747px] h-[75px] ml-[226px] text-white text-[64px] whitespace-nowrap flex items-center justify-center font-normal text-center tracking-[0] leading-[normal]">
                    京都穴場探訪
                </h1>
            </header>

            <section
                className="ml-[100px] w-[999px] h-[166px] mt-[94px] gap-4 flex flex-col bg-white border border-solid border-[#8f2e14]"
                aria-label="現在地情報"
            >
                <div className="w-[999px] h-[75px] text-black text-[32px] flex items-center justify-center font-normal text-center tracking-[0] leading-[normal] mt-4">
                    現在地：{currentAddress}
                </div>

                <div className="w-[999px] h-[75px] text-black text-[32px] flex items-center justify-center font-normal text-center tracking-[0] leading-[normal]">

                </div>
            </section>

            <nav
                className="ml-[100px] mt-[94px] w-[1000px] flex flex-col gap-[53px]"
                aria-label="カテゴリー"
            >
                <div className="w-[1000px] flex gap-[60px]">
                    {categories.slice(0, 2).map((category) => (
                        <button
                            key={category.id}
                            className={`w-[470px] h-[250px] flex flex-col gap-[18px] border border-solid border-[#8f2e14] transition-colors cursor-pointer ${selectedCategories.includes(category.id) ? "bg-gradient-to-r from-[#646364] to-[#a3a3a2] text-white" : "bg-stone-50 hover:bg-stone-100 text-black"}`}
                            aria-label={category.label}
                            onClick={() => toggleCategory(category.id)}
                        >
                            <img
                                className="ml-[155px] w-40 h-40 aspect-[1]"
                                alt={category.alt}
                                src={category.icon}
                            />

                            <div className="ml-[82px] w-[305px] h-[46px] text-[40px] whitespace-nowrap flex items-center justify-center font-normal text-center tracking-[0] leading-[normal]">
                                {category.label}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="w-[1000px] flex gap-[60px]">
                    {categories.slice(2, 4).map((category) => (
                        <button
                            key={category.id}
                            className={`w-[470px] h-[250px] gap-[18px] flex flex-col border border-solid border-[#8f2e14] transition-colors cursor-pointer ${selectedCategories.includes(category.id) ? "bg-gradient-to-r from-[#646364] to-[#a3a3a2] text-white" : "bg-white hover:bg-stone-50 text-black"}`}
                            aria-label={category.label}
                            onClick={() => toggleCategory(category.id)}
                        >
                            <img
                                className="ml-[155px] w-40 h-40 aspect-[1]"
                                alt={category.alt}
                                src={category.icon}
                            />

                            <div className="ml-[82px] w-[305px] h-[46px] text-[40px] whitespace-nowrap flex items-center justify-center font-normal text-center tracking-[0] leading-[normal]">
                                {category.label}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="ml-[1px] w-[1000px] flex gap-[60px]">
                    {categories.slice(4, 6).map((category) => (
                        <button
                            key={category.id}
                            className={`w-[470px] h-[250px] gap-[18px] flex flex-col border border-solid border-[#8f2e14] transition-colors cursor-pointer ${selectedCategories.includes(category.id) ? "bg-gradient-to-r from-[#646364] to-[#a3a3a2] text-white" : "bg-white hover:bg-stone-50 text-black"}`}
                            aria-label={category.label}
                            onClick={() => toggleCategory(category.id)}
                        >
                            <img
                                className="ml-[155px] w-40 h-40 aspect-[1]"
                                alt={category.alt}
                                src={category.icon}
                            />

                            <div className="ml-[82px] w-[305px] h-[46px] text-[40px] whitespace-nowrap flex items-center justify-center font-normal text-center tracking-[0] leading-[normal]">
                                {category.label}
                            </div>
                        </button>
                    ))}
                </div>
            </nav>

            <button
                className="ml-[200px] w-[800px] h-40 mt-[120px] flex bg-white border border-solid border-[#8f2e14] hover:bg-stone-50 transition-colors cursor-pointer"
                aria-label="検索"
                onClick={handleSearch}
            >
                <div className="mt-[15px] w-[533px] h-[129px] ml-[133px] flex">
                    <img
                        className="mt-6 w-[82px] h-[82px] ml-[185px] aspect-[1]"
                        alt="Search"
                        src={search}
                    />

                    <div className="flex items-center justify-center mt-[30px] w-[142px] h-[69px] font-normal text-black text-[64px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        検索
                    </div>
                </div>
            </button>
        </div>
    );
};
