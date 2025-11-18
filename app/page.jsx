"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-semibold mb-10 text-red-500">Bienvenue sur SportSee</h1>
            <p className="font-semibold">Choisissez un utilisateur :</p>

            <ul className="p-0 mt-8 list-none cursor-pointer">
                <li className="mb-2">
                    <Link href="/12" className="hover:text-red-500 transition-colors">Aller au tableau de bord de l’utilisateur 12</Link>
                </li>
                <li>
                    <Link href="/18" className="hover:text-red-500 transition-colors">Aller au tableau de bord de l’utilisateur 18</Link>
                </li>
            </ul>
        </main>
    );
}
