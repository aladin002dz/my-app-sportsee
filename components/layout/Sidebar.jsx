"use client";

import { MdOutlineDirectionsBike } from "react-icons/md";
import { GrYoga } from "react-icons/gr"
import { BiSwim } from "react-icons/bi";
import { LuDumbbell } from "react-icons/lu";

export default function Sidebar() {
    return (
        <aside className="w-20 h-280 flex flex-col content-center items-center bg-black">
            <nav className="flex flex-col gap-6 pt-70">
                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <GrYoga className="size-8" />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <BiSwim className="size-8" />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <MdOutlineDirectionsBike className="size-8" />
                </button>

                <button className="bg-white cursor-pointer rounded-md p-3" id="sidebar__icon">
                    <LuDumbbell className="size-8" />
                </button>

            </nav>
            <p className="block text-white rotate-180 mt-70 text-sm" id="sidebar__text">Copiryght, SportSee 2025</p>
        </aside>
    );
}
