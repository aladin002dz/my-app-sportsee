"use client";

import { MdSportsGymnastics, MdOutlineDirectionsBike } from "react-icons/md";
import { GiLotus } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
                <button className="sidebar__icon">
                    <GiLotus size={32} />
                </button>
                <button className="sidebar__icon">
                    <FaSwimmer size={32} />
                </button>
                <button className="sidebar__icon">
                    <MdOutlineDirectionsBike size={32} />
                </button>
                <button className="sidebar__icon">
                    <MdSportsGymnastics size={32} />
                </button>
            </nav>
            <p className="sidebar__text">Copiryght, SportSee 2025</p>
        </aside>
    );
}
