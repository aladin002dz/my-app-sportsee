"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

export default function ScoreChart({ score }) {
    // Normalise le score en % (0-100)
    const normalizedScore = score <= 1 ? score * 100 : score;

    const data = [
        {
            name: "score",
            value: normalizedScore,
            fill: "#E60000",
        },
    ];

    return (
        <div className="bg-gray-50 rounded-2xl w-75 h-75 relative">
            <h2 className="text-sm font-medium ml-6 mt-6">Score</h2>

            <ResponsiveContainer width={300} height={210}>
                <RadialBarChart
                    innerRadius="80%"    // anneau plus large
                    outerRadius="110%"   // anneau plus grand
                    data={data}
                    startAngle={90}
                    endAngle={500}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        dataKey="value"
                        tick={false}
                    />

                    {/* fond de l’anneau */}
                    <RadialBar
                        data={[{ value: 100 }]}
                        dataKey="value"
                        cornerRadius={10}
                        fill="#FBFBFB"
                    />

                    {/* barre de score */}
                    <RadialBar
                        dataKey="value"
                        cornerRadius={10}
                        fill="#E60000"
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            {/* disque blanc central plus grand */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{normalizedScore}%</p>
                    <p className="text-sm text-gray-500 text-center mt-2 font-semibold">
                        de votre<br />objectif
                    </p>
                </div>
            </div>
        </div>
    );
}
