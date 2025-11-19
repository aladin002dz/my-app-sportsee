"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const kindLabels = {
    1: "Cardio",
    2: "Énergie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
};

export default function PerformanceChart({ data }) {
    // on transforme les données pour avoir des labels lisibles
    const formattedData = (data || []).map((item) => ({
        ...item,
        kindLabel: kindLabels[item.kind] || item.kind,
    }));

    return (
        <div className="bg-[#282D30] rounded-2xl p-4 w-75">
            <ResponsiveContainer width={258} height={260}>
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={formattedData}
                >
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis
                        dataKey="kindLabel"
                        tick={{ fill: "#FFFFFF", fontSize: 12 }}
                    />
                    <Radar
                        name="Performance"
                        dataKey="value"
                        fill="#FF0101B2"
                        fillOpacity={0.7}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
