// URL de base pour les requêtes vers l'API utilisateur
const BASE_URL = "http://localhost:3000/user";

/**
 * Récupère les informations d'un utilisateur
 * @param {*} userId - L'ID de l'utilisateur
 * @returns Les données utilisateur ou null si erreur
 */
export async function getUser(userId) {
    const res = await fetch(`${BASE_URL}/${userId}`);

    if (!res.ok) {
        console.error("Erreur fetch user", res.status);
        return null;
    }

    const json = await res.json();
    return json.data;
}

/**
 *  Récupère les sessions moyennes d'un utilisateur
 * @param {*} userId - L'ID de l'utilisateur
 * @returns Tableau des sessions moyennes ou tableau vide si erreur
 */
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

/**
 * Récupère l'activité quotidienne d'un utilisateur
 * @param {*} userId - L'ID de l'utilisateur
 * @returns Tableau des sessions d'activité ou tableau vide si erreur
 */
export async function getUserActivity(userId) {
    const res = await fetch(`${BASE_URL}/${userId}/activity`);

    if (!res.ok) {
        console.error("Erreur fetch activity", res.status);
        return [];
    }

    const json = await res.json();
    return json?.data?.sessions || [];
}

/**
 * Récupère les performances d'un utilisateur
 * @param {*} userId - L'ID de l'utilisateur
 * @returns Tableau des performances ou tableau vide si erreur
 */
export async function getUserPerformance(userId) {
    const res = await fetch(`${BASE_URL}/${userId}/performance`, {
        cache: "no-store", // Désactive le cache pour éviter les données obsolètes en dev
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
