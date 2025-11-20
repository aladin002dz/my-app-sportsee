import DailyActivityChart from "@/components/user/DailyActivityChart";
import SessionDurationChart from "@/components/user/SessionDurationChart";
import PerformanceChart from "@/components/user/PerformanceChart";
import ScoreChart from "@/components/user/ScoreChart";
import InfoCards from "@/components/user/InfoCards";
import { getUser, getUserAverageSessions, getUserActivity, getUserPerformance } from "@/actions/api";

export default async function DashboardPage({ params }) {
    const { userId } = await params;   

    const userData = await getUser(userId);
    const sessions = await getUserAverageSessions(userId);
    const activitySessions = await getUserActivity(userId);
    const performanceData = await getUserPerformance(userId);

    if (!userData) {
        return (
            <main>
                <h1>Utilisateur introuvable</h1>
                <p>Vérifie l’URL (ex : /12 ou /18).</p>
            </main>
        );
    }

    const userScore = userData.todayScore ?? userData.score ?? 0;

    return (
        <main className="m-5 -mt-2">
            <h1 className="text-5xl font-semibold pb-6">
                Bonjour <span className="text-red-600">
                    {userData.userInfos?.firstName || "Sportif"}
                </span>

            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            {/* Layout 2 colonnes : graphes + cards info */}
            <section className="mt-8 grid grid-cols-[3fr,1fr] gap-8">
                {/* Colonne gauche : graphiques */}
                <div>
                    <DailyActivityChart sessions={activitySessions} />
                    <div className="flex gap-7 mt-5">
                        <SessionDurationChart sessions={sessions} />
                        <PerformanceChart data={performanceData} />
                        <ScoreChart score={userData.todayScore ?? userData.score ?? 0} />
                    </div>
                </div>

                {/* Colonne droite : cards info */}
                <div className="flex flex-col justify-between">
                    <InfoCards keyData={userData.keyData} />
                </div>
            </section>
        </main>
    );
}
