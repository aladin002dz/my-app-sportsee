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
        <div className="bg-gray-50 rounded-2xl w-[250px] h-[250px] aspect-square mx-auto relative p-4">
            <h2 className="text-sm font-medium mb-2">Score</h2>

            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    innerRadius="50%"       // rayon intérieur proportionnel
                    outerRadius="100%"      // rayon externe = taille du conteneur
                    data={data}
                    startAngle={90}         // commence en haut
                    endAngle={-270}         // sens horaire
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        dataKey="value"
                        tick={false}
                    />

                    {/* Fond de l’anneau */}
                    <RadialBar
                        data={[{ value: 100 }]}
                        dataKey="value"
                        cornerRadius="50%"
                        fill="#FBFBFB"
                    />

                    {/* Barre de score */}
                    <RadialBar
                        dataKey="value"
                        cornerRadius="50%"
                        fill="#E60000"
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            {/* Disque blanc central */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white rounded-full w-1/2 h-1/2 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{normalizedScore}%</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 font-semibold">
                        de votre<br />objectif
                    </p>
                </div>
            </div>
        </div>
    );
}
