"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";

function RightSideCursor(props) {
    const { points, width, height} = props;
    if (!points || !points[0]) return null;

    const x = points[0].x;

    return (
        <g>
            <rect
                x={x}
                y={0}            // on part du y réel de la zone du chart
                width={width - x}
                height={height}   // et on utilise la height de cette zone
                fill="rgba(0,0,0,0.25)"
            />
        </g>
    );
}

/**
 * Composant affichant la durée moyenne des sessions de l'utilisateur.
 *
 * @module SessionDurationChart
 * @param {Object} props - Props du composant
 * @param {Array<{day: number, sessionLength: number}>} props.sessions - Tableau des sessions moyennes
 * @returns {JSX.Element} Composant JSX du graphique de durée des sessions
 *
 * @example
 * <SessionDurationChart sessions={sessions} />
 */
export default function SessionDurationChart({ sessions }) {

    // Assure que sessions est un tableau
    const data = Array.isArray(sessions) ? sessions : [];

    // Ajouter points fictifs aux extrémités pour que la courbe touche les bords
    const extendedData = [
        { day: "", sessionLength: data[0]?.sessionLength ?? 0 },// point initial fictif
        ...data,   // données réelles
        { day: "", sessionLength: data[data.length - 1]?.sessionLength ?? 0 }, // point final fictif
    ];

    // Labels des jours de la semaine en français (abréviations)
    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

    /**
* Formate le jour pour l'axe X en utilisant les abréviations
* @param day - valeur du jour dans les données
* @returns abréviation du jour
*/
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

    /**
    * Tooltip minimaliste affichant la durée en minutes
    */
    function CustomTooltip({ active, payload }) {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white text-black text-xs px-2 py-1 rounded shadow-md">
                    <p>{payload[0].value} min</p>
                </div>
            );
        }
        return null;// Ne rien afficher si inactive
    }

    return (
        <div className="bg-[#FF0000] bg-opacity-80 rounded-2xl w-[270px] h-[270px] relative overflow-hidden">
            <h2 className="text-gray-200 text-xs mb-4 mt-5 ml-4 w-[120px]">Durée moyenne des sessions</h2>

            <div className="w-full h-[180px] mt-2">
                {/* Conteneur responsive pour que le graphique s'adapte */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={extendedData}
                        margin={{ top: 0, right: -20, left: -20, bottom: 0 }} // Dépassement des bords
                    >
                        <defs>
                            {/* dégradé de la ligne */}
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,1)" />
                            </linearGradient>

                            {/* dégradé de la zone sous la courbe (optionnel) */}
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                            </linearGradient>
                        </defs>

                        {/* Axe X (jours) */}
                        <XAxis
                            dataKey="day"
                            type="category"
                            scale="point"
                            tickFormatter={formatDay}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#fff", fontSize: 11 }}
                            interval={0}
                            padding={{ left: 0, right: 0 }}
                        />

                        {/* Axe Y caché (durée des sessions) */}
                        <YAxis dataKey="sessionLength" hide />

                        {/* Tooltip personnalisé */}
                        <Tooltip content={<CustomTooltip />}
                            cursor={<RightSideCursor />} />

                        {/* Ligne représentant la durée moyenne */}
                        <Line
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="url(#lineGradient)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 5,
                                stroke: "rgba(255,255,255,0.3)",
                                strokeWidth: 5,
                                fill: "#fff",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
