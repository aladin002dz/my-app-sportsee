"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SessionDurationChart({ userId }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchSessionDuration() {
            try {
                const res = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
                const json = await res.json();
                setData(json.data.sessions);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        }
        fetchSessionDuration()
    }, [userId]);

    function CustomTooltip({ active, payload }) {
        if (active && payload && payload.length) {
            return (
                <div className="session-tooltip">
                    <p>{payload[0].value} min</p>
                </div>
            );
        }
        return null;
    }

    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
    function formatDay(day) {
        return dayLabels[day - 1] || day;
    }

    return (
        <div className="session-chart-container">
            <h2>Durée moyenne des sessions</h2>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
                    <XAxis
                        dataKey="day"
                        tickFormatter={formatDay}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis dataKey="sessionLength" hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#FFFFFF"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
