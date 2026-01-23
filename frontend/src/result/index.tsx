

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, Spot } from "../api";
import { calculateDistance, formatDistance } from "../utils/location";

interface SpotWithDistance extends Spot {
    distanceKm: number;
}

export const Screen = (): JSX.Element => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [spots, setSpots] = useState<SpotWithDistance[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const categoryFilter = searchParams.get("category");

    useEffect(() => {
        const fetchAndFilterSpots = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await api.getSpots();
                let processedSpots: SpotWithDistance[] = data.map(spot => ({
                    ...spot,
                    distanceKm: calculateDistance(lat, lng, spot.lat, spot.lng)
                }));

                // Filter by category if one is selected
                if (categoryFilter) {
                    const selectedCategoryIds = categoryFilter.split(",");
                    processedSpots = processedSpots.filter(spot =>
                        // Check if any of the spot's categories match any of the selected categories
                        spot.category && spot.category.some(cat => selectedCategoryIds.includes(cat))
                    );
                }

                // Sort by distance
                if (lat !== 0 && lng !== 0) {
                    processedSpots.sort((a, b) => a.distanceKm - b.distanceKm);
                }

                setSpots(processedSpots);
            } catch (error) {
                console.error("Failed to fetch spots", error);
                setError("データの取得に失敗しました。");
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterSpots();
    }, [lat, lng, categoryFilter]);

    return (
        <div className="bg-[#f9f7f1] w-full min-w-[1200px] min-h-[1920px] flex flex-col">
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

            <div className="ml-[100px] mt-[83px] w-[999px] h-[550px] bg-white border border-solid border-[#8f2e14] flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-4xl">
                    📍
                </div>
                <div className="text-black text-5xl font-normal">
                    マップを配置
                </div>
            </div>

            {loading ? (
                <div className="mt-20 text-center text-4xl">読み込み中...</div>
            ) : error ? (
                <div className="mt-20 text-center text-red-500 text-4xl">{error}</div>
            ) : (
                spots.map((spot, index) => (
                    <div
                        key={spot.id}
                        className="mt-[83px] ml-[99px] w-[999px] flex cursor-pointer"
                        onClick={() => navigate(`/detail/${spot.id}`)}
                    >
                        <article
                            className={`w-[999px] h-[166px] relative ${index === 0 ? "bg-stone-50" : "bg-white"} overflow-hidden border border-solid border-[#8f2e14] hover:bg-stone-100 transition-colors`}
                        >
                            <div className="absolute top-0 left-[166px] w-[833px] h-[102px] text-black text-5xl flex items-center justify-center font-normal text-center tracking-[0] leading-[normal]">
                                {spot.name}
                            </div>

                            <div className="absolute top-[102px] left-[166px] w-[833px] h-[67px] flex items-center justify-center font-normal text-[#6b6b6b] text-[26px] text-center tracking-[0] leading-[normal]">
                                現在地から：{formatDistance(spot.distanceKm)}
                            </div>

                            <div className="absolute top-0 left-0 w-[166px] h-[166px] flex bg-[#00000080]">
                                {spot.thumbnailImg ? (
                                    <img src={spot.thumbnailImg} alt={spot.name} className="w-full h-full object-cover" />
                                ) : spot.images && spot.images.length > 0 && spot.images[0] !== "画像" ? (
                                    <img src={spot.images[0]} alt={spot.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center mt-[63px] w-[92px] h-[39px] ml-[37px] font-normal text-white text-[32px] text-center tracking-[0] leading-[normal]">
                                        image
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>
                ))
            )}
        </div>
    );
};
