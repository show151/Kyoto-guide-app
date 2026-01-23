

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, Spot } from "../api";

export const Screen = (): JSX.Element => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [spot, setSpot] = useState<Spot | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpot = async () => {
            if (!id) return;
            try {
                const data = await api.getSpotById(id);
                setSpot(data);
            } catch (error) {
                console.error("Failed to fetch spot", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpot();
    }, [id]);

    if (loading) {
        return <div className="mt-20 text-center text-4xl">読み込み中...</div>;
    }

    if (!spot) {
        return <div className="mt-20 text-center text-4xl">スポットが見つかりませんでした</div>;
    }

    const getFeeLabel = (spot: Spot) => {
        // グルメ、ショッピングの場合は表示しない
        if (spot.category.some(c => c === "グルメ" || c === "ショッピング")) {
            return null;
        }

        // 神社仏閣判定 (簡易的)
        if (spot.name.match(/(神社|寺|宮|院|閣|殿)/)) {
            return "拝観料";
        }

        // それ以外
        return "入館料";
    };

    const feeLabel = spot ? getFeeLabel(spot) : null;
    const feeValue = spot?.entranceFee === "なし" ? "無料" : spot?.entranceFee;

    return (
        <div className="bg-[#f9f7f1] w-full min-w-[1200px] min-h-[1920px] flex flex-col items-center pb-20">
            <header className="w-[1200px] h-[160px] flex bg-[#e94709] relative shrink-0">
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

            <div className="w-[1200px] relative shrink-0 flex flex-col">
                <div className="w-full h-[400px] flex flex-col items-center justify-center relative overflow-hidden bg-[#6b6b6b]">
                    {spot.thumbnailImg ? (
                        <img src={spot.thumbnailImg} alt={spot.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    ) : spot.images && spot.images.length > 0 && spot.images[0] !== "画像" ? (
                        <img src={spot.images[0]} alt={spot.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    ) : (
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                    )}

                    <div className="absolute top-8 left-8 flex gap-4 text-white text-3xl font-normal z-10">
                        {Array.isArray(spot.category) ? (
                            spot.category.map((cat, index) => (
                                <span key={index}>#{cat}</span>
                            ))
                        ) : (
                            <span>#カテゴリなし</span>
                        )}
                    </div>

                    {!spot.thumbnailImg && (!spot.images || spot.images.length === 0 || spot.images[0] === "画像") ? (
                        <span className="text-white text-5xl font-normal z-10">image</span>
                    ) : null}

                    <div className="absolute bottom-0 w-full bg-[#6b6b6b]/60 py-4 z-10">
                        <div className="text-center text-white text-[80px] font-normal">
                            {spot.name}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[1000px] mt-12 bg-white border border-[#8f2e14] p-12 flex flex-col gap-10">
                <section>
                    <h2 className="text-4xl font-bold mb-4 text-black">概要文</h2>
                    <p className="text-3xl leading-relaxed text-black">
                        {spot.description || "説明文がありません"}
                    </p>
                </section>

                <section>
                    <h2 className="text-4xl font-bold mb-4 text-black">住所</h2>
                    <p className="text-3xl text-black">{spot.address || "住所情報がありません"}</p>
                </section>

                <section>
                    <h2 className="text-4xl font-bold mb-4 text-black">営業時間</h2>
                    <p className="text-3xl text-black">平日：09:00~17:00</p>
                    <p className="text-3xl text-black">休日：09:00~17:00</p>
                </section>

                {feeLabel && (
                    <section>
                        <h2 className="text-4xl font-bold mb-4 text-black">{feeLabel}</h2>
                        <p className="text-3xl text-black">{feeValue || "無料"}</p>
                    </section>
                )}

                <section>
                    <h2 className="text-4xl font-bold mb-4 text-black">リンク</h2>
                    <div className="flex flex-col gap-6 pt-2">
                        <button
                            className={`w-full h-24 border border-gray-400 rounded flex items-center justify-center text-3xl text-black transition-colors ${spot.url ? 'hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            disabled={!spot.url}
                            onClick={() => spot.url && window.open(spot.url, '_blank')}
                        >
                            公式サイト
                        </button>
                        <button
                            className="w-full h-24 border border-gray-400 rounded flex items-center justify-center text-3xl text-black hover:bg-gray-50 transition-colors"
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`, '_blank')}
                        >
                            地図で見る
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};
