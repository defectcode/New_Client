import React, { useRef } from "react";

const NavBarCrowdfundingMobileStatic = ({ setActiveSection, activeSection }) => {
    const navbarRef = useRef(null);

    const handleClick = (section) => {
        setActiveSection(section); 
    };

    const linkClasses = (section) => {
        const baseClasses = "px-1 py-[6px] text-[14px] flex justify-center items-center mt-1 w-full relative";
        const activeClasses =
            'text-[#1E1E1E] border-b-2 border-[#1E1E1E] font-avenir-heavy after:absolute after:content-[""] after:h-[1px] after:w-full after:left-0 after:bottom-[3px]';
        const inactiveClasses = "text-[#5B5B5B] border-b-4 border-transparent font-avenir";

        return `${baseClasses} ${activeSection === section ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="bg-[#F9F9F9]">
            <div
                ref={navbarRef}
                id="navbar-mobile-original"
                className={`transition-transform duration-500 ease-in-out z-50`} 
            >
                <div className="flex items-center justify-center h-[40px]">
                    <div className="flex items-center justify-center gap-[30px] w-full px-5">
                        <button
                            className={linkClasses("overview")}
                            onClick={() => handleClick("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={linkClasses("rewards")}
                            onClick={() => handleClick("rewards")}
                        >
                            Rewards
                        </button>
                        <button
                            className={linkClasses("community")}
                            onClick={() => handleClick("community")}
                        >
                            Community
                        </button>
                        <button
                            className={linkClasses("extras")}
                            onClick={() => handleClick("extras")}
                        >
                            Extras
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarCrowdfundingMobileStatic;
