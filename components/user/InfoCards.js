"use client";

function InfoCard({ icon, label, value, unit, bgIcon }) {
    return (
        <div className="flex items-center bg-gray-50 rounded-2xl p-4 w-64 h-24 shadow-sm">
            <div className={`flex items-center justify-center rounded-lg w-12 h-12 mr-4 ${bgIcon}`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <p className="text-lg font-bold">
                    {value}
                    {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
                </p>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
}

export default function InfoCards({ keyData }) {
    if (!keyData) return null;

    const {
        calorieCount,
        proteinCount,
        carbohydrateCount,
        lipidCount,
    } = keyData;

    return (
        <div className="flex flex-col gap-4">
            <InfoCard
                label="Calories"
                value={calorieCount}
                unit="kCal"
                bgIcon="bg-red-100"
                icon={<span>🔥</span>}
            />
            <InfoCard
                label="Proteines"
                value={proteinCount}
                unit="g"
                bgIcon="bg-blue-100"
                icon={<span>🍗</span>}
            />
            <InfoCard
                label="Glucides"
                value={carbohydrateCount}
                unit="g"
                bgIcon="bg-yellow-100"
                icon={<span>🍞</span>}
            />
            <InfoCard
                label="Lipides"
                value={lipidCount}
                unit="g"
                bgIcon="bg-pink-100"
                icon={<span>🧈</span>}
            />
        </div>
    );
}
