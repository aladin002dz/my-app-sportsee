"use client";

import { useEffect, useState } from "react";
import DailyActivityChart from "@/components/user/DailyActivityChart";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        // Exemple : récupérer les infos utilisateur depuis l'API
        async function fetchUser() {
            const res = await fetch("http://localhost:3000/user/12");
            const json = await res.json();
            setFirstName(json.data.userInfos.firstName);
        }
        fetchUser();
    }, []);

    const userId = 12; // à passer à tes composants graphiques

    return (
        <MainLayout>
            <h1>
                Bonjour <span className='username'>{firstName}</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            {/* 👉 Ajout du graphique ici */}
            <DailyActivityChart userId={userId} />

        </MainLayout>
    );
}
