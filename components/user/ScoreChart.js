"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

/**
 * Composant affichant le score de l'utilisateur sous forme de graphique circulaire.
 *
 * @param props - Props du composant
 * @param props.score - Score de l'utilisateur (0 à 1 ou 0 à 100)
 * @returns Composant JSX du graphique de score
 *
 * @example
 * <ScoreChart score={userScore} />
 */
export default function ScoreChart({ score }) {
    // Normalise le score en % (0-100)
    // Si le score est inférieur ou égal à 1, on le multiplie par 100 pour obtenir un %
    const normalizedScore = score <= 1 ? score * 100 : score;

    // Création des données pour le graphique radial
    const data = [
        {
            name: "score",
            value: normalizedScore,
            fill: "#E60000",
        },
    ];

    return (
        // Conteneur principal du graphique avec style Tailwind
        <div className="bg-gray-50 rounded-2xl w-[250px] h-[250px] aspect-square mx-auto relative p-4">
            <h2 className="text-sm font-medium mb-2">Score</h2>

            {/* Conteneur responsive qui ajuste le graphique à la taille du parent */}
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    innerRadius="50%"       // rayon intérieur proportionnel
                    outerRadius="100%"      // rayon externe = taille du conteneur
                    data={data}
                    startAngle={90}         // commence en haut
                    endAngle={-270}         // sens horaire
                >
                    {/* Axe polaire pour les valeurs, ici invisible (tick=false) */}
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        dataKey="value"
                        tick={false}
                    />

                    {/* Fond de l’anneau (barre grise derrière le score) */}
                    <RadialBar
                        data={[{ value: 100 }]}
                        dataKey="value"
                        cornerRadius="50%"
                        fill="#FBFBFB"
                    />

                    {/* Barre représentant le score réel */}
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
