"use client";
//importer graphique Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/**
 * Composant affichant l'activité quotidienne de l'utilisateur sous forme de graphique.
 *
 * @param props - Props du composant
 * @param props.sessions - Tableau des sessions d'activité quotidienne
 * @returns Composant JSX du graphique d'activité
 *
 * @example
 * <DailyActivityChart sessions={activitySessions} />
 */
export default function DailyActivityChart({ sessions }) {
    // S'assure que sessions est un tableau valide
    const data = sessions || [];

    /**
 * Tooltip personnalisé pour le graphique
 * @param payload - Données de la barre survolée
 * @param active - Booléen indiquant si le tooltip doit être affiché
 */
    function CustomTooltip({ payload, active }) {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#e60000] text-white text-xs px-2 py-1">
                    <p>{payload[0].value} kg</p>
                    <p>{payload[1].value} kCal</p>
                </div>
            );
        }
        return null; // Ne rien afficher si le tooltip n'est pas actif
    }

    return (
        // Conteneur principal du graphique avec style Tailwind
        <div className="w-full max-w-[800px] h-[360px] bg-gray-50 rounded-2xl p-8 mt-10">
            <div className="flex justify-between items-center mb-2 gap-16 text-sm">
                <h2 className="font-medium">Activité quotidienne</h2>
                <ul className="activityList">
                    <li>Poids (kg)</li>
                    <li>Calories brûlées (kCal)</li>
                </ul>

                {/* Composant Legend de Recharts */}
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

            {/* Conteneur responsive pour que le graphique s'adapte */}
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 50, right: 20, left: 20 }}>

                    {/* Grille horizontale uniquement (vertical=false) */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} yAxisId="cal" />

                    {/* Axe des abscisses (jours) */}
                    <XAxis dataKey="day" tickFormatter={(d, i) => i + 1} />
                    
                    {/* Axe des ordonnées pour le poids */}
                    <YAxis
                        yAxisId="kg"
                        orientation="right"
                        dataKey="kilogram"
                        axisLine={false}
                        tickLine={false}
                    />
                    {/* Axe des ordonnées pour les calories (caché) */}
                    <YAxis yAxisId="cal" hide dataKey="calories" />

                    {/* Tooltip personnalisé */}
                    <Tooltip content={<CustomTooltip />} />

                    {/* Barre représentant le poids */}
                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={8}
                        radius={[3, 3, 0, 0]}
                        stroke="none"
                    />

                    {/* Barre représentant les calories */}
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={8}
                        radius={[3, 3, 0, 0]}
                        stroke="none"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
