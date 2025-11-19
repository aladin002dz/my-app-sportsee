import DailyActivityChart from "@/components/user/DailyActivityChart";
import SessionDurationChart from "@/components/user/SessionDurationChart";
import PerformanceChart from "@/components/user/PerformanceChart";

async function getUser(userId) {
    const res = await fetch(`http://localhost:3000/user/${userId}`);

    if (!res.ok) {
        console.error("Erreur fetch user", res.status);
        return null;
    }

    const json = await res.json();
    return json.data;
}

async function getUserAverageSessions(userId) {
    const res = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);

    if (!res.ok) {
        console.error("Erreur fetch average-sessions", res.status);
        return [];
    }

    const json = await res.json();
    console.log("average-sessions json :", json);

    return json?.data?.sessions || [];
}

async function getUserActivity(userId) {
    const res = await fetch(`http://localhost:3000/user/${userId}/activity`);

    if (!res.ok) {
        console.error("Erreur fetch activity", res.status);
        return [];
    }

    const json = await res.json();
    return json?.data?.sessions || [];
}

async function getUserPerformance(userId) {
    const res = await fetch(`http://localhost:3000/user/${userId}/performance`, {
        cache: "no-store", // pour éviter le cache en dev
    });

    if (!res.ok) {
        console.error("Erreur fetch performance", res.status);
        return [];
    }

    const json = await res.json();

    // dans l’API classique SportSee, c’est json.data.data
    // et json.data.kind contient la map des types
    return json?.data?.data || [];
}

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

    return (
        <main className="m-10 -mt-2">
            <h1 className="text-5xl font-semibold pb-6">
                Bonjour <span className="text-red-600">
                    {userData.userInfos?.firstName || "Sportif"}
                </span>

            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            <section>
                <DailyActivityChart sessions={activitySessions} />
                <div className="flex gap-7 mt-5">
                    <SessionDurationChart sessions={sessions} />
                    <PerformanceChart data={performanceData} />
                </div>
            </section>
        </main>
    );
}
