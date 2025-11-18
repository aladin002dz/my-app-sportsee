"use client";

import { useEffect, useState } from "react";
import DailyActivityChart from "@/components/user/DailyActivityChart";
import SessionDurationChart from "@/components/user/SessionDurationChart";

export default function HomePage() {
    const [firstName, setFirstName] = useState("");
    const userId = 12; // à passer aux composants graphiques

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(`http://localhost:3000/user/${userId}`);
                const json = await res.json();
                setFirstName(json.data.userInfos.firstName);
            } catch (error) {
                console.error("Erreur lors du chargement de l'utilisateur :", error);
            }
        }
        fetchUser();
    }, []);

    return (
        <div>
            <h1 className="font-medium text-5xl pb-8">
                Bonjour <span className='text-red-600'>{firstName}</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

            <section>
                {/* 👉 Ajout du graphique ici */}
                <DailyActivityChart userId={userId} />
                <SessionDurationChart userId={userId} />
            </section>
        </div>

    );
}
