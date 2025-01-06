'use client';
import { useState } from "react";
import Content from "./Content";

export default function PolicyNavBar() {
    const [activeButton, setActiveButton] = useState("privacy");

    const buttons = [
        { id: "privacy", label: "Privacy Policy" },
        { id: "faq", label: "FAQ" },
        { id: "return", label: "Return Policy" },
        { id: "terms", label: "Terms & Conditions" },
    ];

    return (
        <div className="flex flex-col items-center gap-5 pt-5 bg-gray-50 min-h-screen">
            <nav className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-4 w-full sm:w-auto whitespace-nowrap no-scrollbar md:px-0 px-5">
                {buttons.map((button) => (
                    <button
                        key={button.id}
                        onClick={() => setActiveButton(button.id)}
                        className={`px-5 py-3 h-[48px] rounded-[10px] border border-transparent text-[14px] transition-colors duration-300
                        ${
                            activeButton === button.id
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-gray-200"
                        }`}
                    >
                        {button.label}
                    </button>
                ))}
            </nav>

            <Content activeButton={activeButton} />
        </div>
    );
}
