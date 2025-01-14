'use client'
import React, { useState, useEffect } from "react";
import './OurMission.model.css'; 
import GoalsSectionMobile from './components/GoalsSectionMobile';
import GoalsSectionDesktop from './components/GoalsSectionDesktop';
import Earth from './components/Earth';
import OurMissionTitle from './components/OurMissionTitle';
import useWindowDimensions from './components/useWindowDimensions';

const OurMission = () => {
    const { width } = useWindowDimensions();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(width < 768);
    }, [width]);

    return (
        <div className="bg-black lg:h-[1830px]">
            <Earth/>
            {isMobile ? <GoalsSectionMobile /> : <GoalsSectionDesktop />}
        </div>
    );
}

export default OurMission;
