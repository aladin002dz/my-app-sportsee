"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="app">
            <Header />
            <div className="app__content">
                <Sidebar />
                <main className="app__main">
                    {children}
                </main>
            </div>
        </div>
    );
}
