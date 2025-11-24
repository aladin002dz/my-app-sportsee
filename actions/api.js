// URL de base pour les requêtes vers l'API utilisateur
const BASE_URL = "http://localhost:3000/user";

import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE, } from "@/src/mocks/userData";

// helpers mock
function getMockUser(userId) {
    return USER_MAIN_DATA.find((u) => String(u.id) === String(userId)) || null;
}

function getMockUserActivity(userId) {
    const entry =
        USER_ACTIVITY.find((u) => String(u.userId) === String(userId)) || {};
    return entry.sessions || [];
}

function getMockUserAverageSessions(userId) {
    const entry =
        USER_AVERAGE_SESSIONS.find((u) => String(u.userId) === String(userId)) ||
        {};
    return entry.sessions || [];
}

function getMockUserPerformance(userId) {
    const entry =
        USER_PERFORMANCE.find((u) => String(u.userId) === String(userId)) || {};
    // tu peux renvoyer `entry.data` ou la structure complète selon ce que ton <PerformanceChart /> attend
    return entry.data || [];
}

/**
 * USER
 */

/**
 * Récupère les informations d'un utilisateur via son ID.
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Object|null>} Une promesse qui résout avec les données utilisateur ou null en cas d'erreur.
 */
export async function getUser(userId) {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`);

        if (!res.ok) {
            console.error("Erreur fetch user", res.status, "→ fallback mock");
            return getMockUser(userId);
        }

        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Erreur réseau user → fallback mock :", error);
        return getMockUser(userId);
    }
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur.
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec un tableau des sessions moyennes ou un tableau vide en cas d'erreur.
 */
export async function getUserAverageSessions(userId) {
    try {
        const res = await fetch(`${BASE_URL}/${userId}/average-sessions`);

        if (!res.ok) {
            console.error(
                "Erreur fetch average-sessions",
                res.status,
                "→ fallback mock"
            );
            return getMockUserAverageSessions(userId);
        }

        const json = await res.json();
        return json?.data?.sessions || [];
    } catch (error) {
        console.error(
            "Erreur réseau average-sessions → fallback mock :",
            error
        );
        return getMockUserAverageSessions(userId);
    }
}

/**
 * Récupère l'activité quotidienne d'un utilisateur (poids, calories).
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Array<Object>>} Une promesse qui résout avec un tableau des sessions d'activité ou un tableau vide en cas d'erreur.
 */
export async function getUserActivity(userId) {
    try {
        const res = await fetch(`${BASE_URL}/${userId}/activity`);

        if (!res.ok) {
            console.error("Erreur fetch activity", res.status, "→ fallback mock");
            return getMockUserActivity(userId);
        }

        const json = await res.json();
        return json?.data?.sessions || [];
    } catch (error) {
        console.error("Erreur réseau activity → fallback mock :", error);
        return getMockUserActivity(userId);
    }
}
/**
 * Récupère les performances d'un utilisateur (énergie, endurance, etc.).
 * @param {string|number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<Object|Array>} Une promesse qui résout avec les données de performance ou un tableau vide en cas d'erreur.
 */
export async function getUserPerformance(userId) {
    try {
        const res = await fetch(`${BASE_URL}/${userId}/performance`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Erreur fetch performance", res.status, "→ fallback mock");
            return getMockUserPerformance(userId);
        }

        const json = await res.json();
        return json?.data?.data || [];
    } catch (error) {
        console.error("Erreur réseau performance → fallback mock :", error);
        return getMockUserPerformance(userId);
    }
}
