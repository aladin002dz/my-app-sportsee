// URL de base pour les requêtes vers l'API utilisateur
const BASE_URL = "http://localhost:3000/user";

/**
 * Récupère les informations d'un utilisateur via son ID.
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Object|null>} Une promesse qui résout avec les données utilisateur ou null en cas d'erreur.
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
 * Récupère la durée moyenne des sessions d'un utilisateur.
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec un tableau des sessions moyennes ou un tableau vide en cas d'erreur.
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
 * Récupère l'activité quotidienne d'un utilisateur (poids, calories).
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec un tableau des sessions d'activité ou un tableau vide en cas d'erreur.
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
 * Récupère les performances d'un utilisateur (énergie, endurance, etc.).
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Object|Array>} Une promesse qui résout avec les données de performance ou un tableau vide en cas d'erreur.
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
