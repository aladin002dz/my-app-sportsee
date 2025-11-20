"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SessionDurationChart({ sessions }) {
    const data = Array.isArray(sessions) ? sessions : [];

    // Ajouter points fictifs aux extrémités pour que la courbe touche les bords
    const extendedData = [
        { day: "", sessionLength: data[0]?.sessionLength ?? 0 },
        ...data,
        { day: "", sessionLength: data[data.length - 1]?.sessionLength ?? 0 },
    ];

    // Tooltip minimaliste blanc
    function CustomTooltip({ active, payload }) {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white text-black text-xs px-2 py-1 rounded shadow-md">
                    <p>{payload[0].value} min</p>
                </div>
            );
        }
        return null;
    }

    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
    function formatDay(day) {
        if (!day) return ""; // points fictifs
        let n;
        if (typeof day === "number") n = day;
        else if (typeof day === "string" && /^\d+$/.test(day)) n = parseInt(day, 10);
        else {
            const d = new Date(day);
            if (!isNaN(d)) {
                const jsDay = d.getDay();
                n = jsDay === 0 ? 7 : jsDay;
            }
        }
        return dayLabels[n - 1] ?? "";
    }

    return (
        <div className="bg-[#FF0000] bg-opacity-80 rounded-2xl w-[250px] h-[250px] relative">
            <h2 className="text-gray-300 text-xs mb-4 mt-5 ml-4 w-[120px]">Durée moyenne des sessions</h2>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={extendedData}
                    margin={{ top: 20, right: 0, left: 0, bottom: 30 }}
                >
                    <XAxis
                        dataKey="day"
                        type="category"
                        scale="point"
                        tickFormatter={formatDay}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#fff", fontSize: 12 }}
                        tickMargin={10}
                        interval={0}
                    />
                    <YAxis dataKey="sessionLength" hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#fff"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
