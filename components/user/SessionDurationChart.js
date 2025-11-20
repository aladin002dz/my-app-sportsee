"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Composant affichant la durée moyenne des sessions de l'utilisateur.
 *
 * @param props - Props du composant
 * @param props.sessions - Tableau des sessions moyennes
 * @returns Composant JSX du graphique de durée des sessions
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

    return (
        // Conteneur principal avec fond rouge semi-transparent et coins arrondis
        <div className="bg-[#FF0000] bg-opacity-80 rounded-2xl w-[250px] h-[250px] relative">
            <h2 className="text-gray-300 text-xs mb-4 mt-5 ml-4 w-[120px]">Durée moyenne des sessions</h2>
            
            {/* Conteneur responsive pour que le graphique s'adapte */}
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={extendedData}
                    margin={{ top: 20, right: 0, left: 0, bottom: 30 }}
                >

                    {/* Axe X (jours) */}
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

                    {/* Axe Y caché (durée des sessions) */}
                    <YAxis dataKey="sessionLength" hide />

                    {/* Tooltip personnalisé */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* Ligne représentant la durée moyenne */}
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
