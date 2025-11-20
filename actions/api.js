const BASE_URL = "http://localhost:3000/user";

export async function getUser(userId) {
    const res = await fetch(`${BASE_URL}/${userId}`);

    if (!res.ok) {
        console.error("Erreur fetch user", res.status);
        return null;
    }

    const json = await res.json();
    return json.data;
}

export async function getUserAverageSessions(userId) {
    const res = await fetch(`${BASE_URL}/${userId}/average-sessions`);

    if (!res.ok) {
        console.error("Erreur fetch average-sessions", res.status);
        return [];
    }

    const json = await res.json();
    console.log("average-sessions json :", json);

    return json?.data?.sessions || [];
}

export async function getUserActivity(userId) {
    const res = await fetch(`${BASE_URL}/${userId}/activity`);

    if (!res.ok) {
        console.error("Erreur fetch activity", res.status);
        return [];
    }

    const json = await res.json();
    return json?.data?.sessions || [];
}

export async function getUserPerformance(userId) {
    const res = await fetch(`${BASE_URL}/${userId}/performance`, {
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
