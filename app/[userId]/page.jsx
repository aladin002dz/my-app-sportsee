// app/[userId]/page.jsx
// PAS de "use client" ici → Server Component

import DailyActivityChart from "@/components/user/DailyActivityChart";
import SessionDurationChart from "@/components/user/SessionDurationChart";

async function getUser(userId) {
    const res = await fetch(`http://localhost:3000/user/${userId}`);

    if (!res.ok) {
        console.error("Erreur fetch user", res.status);
        return null;
    }

    const json = await res.json();
    return json.data; // adapte si ton backend renvoie autre chose
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

export default async function DashboardPage({ params }) {
    const { userId } = await params;   // ✅ fix the Promise issue

    const userData = await getUser(userId);
    const sessions = await getUserAverageSessions(userId);

    if (!userData) {
        return (
            <main style={{ padding: "2rem" }}>
                <h1>Utilisateur introuvable</h1>
                <p>Vérifie l’URL (ex : /12 ou /18).</p>
            </main>
        );
    }

    return (
        <main>
            <h1 className="text-5xl font-semibold pb-6">
                Bonjour <span className="text-red-600">
                    {userData.userInfos?.firstName || "Sportif"}
                </span>

            </h1>
            <p className="font-medium">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            <section className="mt-2 grid gap-1.5">
                <DailyActivityChart userId={userId} />
                <SessionDurationChart sessions={sessions} />
            </section>
        </main>
    );
}
