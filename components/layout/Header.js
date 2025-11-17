"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <Image src="/logo.png" alt="SportSee" width={120} height={40} />
            </div>
            <nav className="header__nav">
                <Link href="/">Accueil</Link>
                <Link href="#">Profil</Link>
                <Link href="#">Réglage</Link>
                <Link href="#">Communauté</Link>
            </nav>
        </header>
    );
}
