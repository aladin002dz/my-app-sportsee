import DailyActivityChart from "@/components/user/DailyActivityChart";
import SessionDurationChart from "@/components/user/SessionDurationChart";
import PerformanceChart from "@/components/user/PerformanceChart";
import ScoreChart from "@/components/user/ScoreChart";
import InfoCards from "@/components/user/InfoCards";
import { getUser, getUserAverageSessions, getUserActivity, getUserPerformance } from "@/actions/api";

/**
 * Page principale du dashboard utilisateur
 * Récupère les données de l'utilisateur et affiche :
 * - Graphiques d'activité, durée de session, performance et score
 * - Cartes d'information clés
 *
 * @param props - Props de la page
 * @param props.params - Paramètres de la route
 * @param props.params.userId - ID de l'utilisateur
 * @returns Composant de la page Dashboard
 *
 * @example
 * // Exemple d'utilisation dans Next.js
 * <DashboardPage params={{ userId: 12 }} />
 */
export default async function DashboardPage({ params }) {
    const { userId } = await params;   

    /// Récupération des données utilisateur
    const userData = await getUser(userId);
    const sessions = await getUserAverageSessions(userId);
    const activitySessions = await getUserActivity(userId);
    const performanceData = await getUserPerformance(userId);

    // Si l'utilisateur n'existe pas, afficher un message d'erreur
    if (!userData) {
        return (
            <main>
                <h1>Utilisateur introuvable</h1>
                <p>Vérifie l’URL (ex : /12 ou /18).</p>
            </main>
        );
    }

    // Score utilisateur (todayScore ou score par défaut)
    const userScore = userData.todayScore ?? userData.score ?? 0;

    return (
        <main className="m-5 -mt-2 max-w-6xl mx-auto">
            {/* Header : Bonjour {Prénom} */}
            <h1 className="text-5xl font-semibold pb-6">
                Bonjour <span className="text-red-600">
                    {userData.userInfos?.firstName || "Sportif"}
                </span>

            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            {/* Layout 2 colonnes : graphes + cards info */}
            <section className="mt-8 gap-6 flex">
                {/* Colonne gauche : graphiques */}
                <div className="flex-1 flex flex-col gap-5">
                    {/* Graphique activité quotidienne */}
                    <DailyActivityChart sessions={activitySessions} />

                    <div className="flex flex-wrap gap-7">

                        {/* Graphique durée des sessions */}
                        <SessionDurationChart sessions={sessions} />

                        {/* Graphique performance */}
                        <PerformanceChart data={performanceData} />

                        {/* Graphique score */}
                        <ScoreChart score={userScore} />
                    </div>
                </div>

                {/* Colonne droite : cards */}
                <aside className="w-64 mt-5">
                    <InfoCards keyData={userData.keyData} />
                </aside>
            </section>
        </main>
    );
}
