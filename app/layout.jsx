// src/app/layout.js
import "./../styles/globals.css";

export const metadata = {
    title: "SportSee",
    description: "Dashboard utilisateur SportSee",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
