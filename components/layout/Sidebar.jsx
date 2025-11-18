"use client";

import { MdOutlineDirectionsBike } from "react-icons/md";
import { GrYoga } from "react-icons/gr"
import { BiSwim } from "react-icons/bi";
import { LuDumbbell } from "react-icons/lu";

export default function Sidebar() {
    return (
        <aside className="w-20 h-300 flex flex-col content-center items-center bg-black">
            <nav className="flex flex-col gap-6 pt-50">
                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <GrYoga size={32} />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <BiSwim size={32} />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <MdOutlineDirectionsBike size={32} />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <LuDumbbell size={32} />
                </button>

            </nav>
            <p className="block text-white rotate-180 mt-70" id="sidebar__text">Copiryght, SportSee 2025</p>
        </aside>
    );
}
