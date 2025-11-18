"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ActivityChart({ userId }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchActivity() {
            try {
                const res = await fetch(`http://localhost:3000/user/${userId}/activity`);
                const json = await res.json();
                setData(json.data.sessions);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        }
        fetchActivity();
    }, [userId]);

    function CustomTooltip({ payload, active }) {
        if (active && payload && payload.length) {
            return (
                <div className="customTooltip">
                    <p>{payload[0].value} kg</p>
                    <p>{payload[1].value} kCal</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="w-190 h-90 bg-gray-50 rounded-2xl p-8 mt-20">
            <div className="flex content-between items-center mb-2 gap-65 text-sm">
                <h2>Activité quotidienne</h2>
                <ul className="activityList">
                    <li>Poids (kg)</li>
                    <li>Calories brûlées (kCal)</li>
                </ul>

                <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ top: -10 }}
                    payload={[
                        { value: "Poids (kg)", type: "circle", color: "#282D30" },
                        { value: "Calories brûlées (kCal)", type: "circle", color: "#E60000" },
                    ]}
                />
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 50, right: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} yAxisId="cal" />
                    <XAxis dataKey="day" tickFormatter={(d, i) => i + 1} />
                    <YAxis
                        yAxisId="kg"
                        orientation="right"
                        dataKey="kilogram"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis yAxisId="cal" hide dataKey="calories" />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={8}
                        radius={[3, 3, 0, 0]}
                    />
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={8}
                        radius={[3, 3, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
