'use client'
import React, { useState } from "react";
import HeaderCrowdfunding from './HeaderCrowdfunding';
import HeaderCrowdfundingMobile from './HeaderCrowdfundingMobile';
import Rewards from './components/components/Rewards/Rewards';
import Community from './components/components/Community/Community';
import Extras from './components/components/Extras/Extras';
import Overview from './components/components/Overview/Overview';
import OverviewMobile from './components/components/Overview/OverviewMobile';
import RewardsMobile from './components/components/Rewards/RewardsMobile';
import CommunityMobile from './components/components/Community/CommunityMobile';
import ExtrasMobile from './components/components/Extras/ExtrasMobile';
import NavBarCrowdfundingMobile from "./components/mobile/NavBarCrowdfundingMobile";
import NavBarCrowdfundingMobileStatic from "./components/mobile/NavBarCrowdfundingMobileStatic";
import NavBarCrowdfunding from "./components/NavBarCrowdfunding";
import { Footer } from "@/components/layouts/main-layout/footer/Footer";
import useDeviceType from './components/hooks/useDeviceType';

export default function Crowdfunding() {
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return isMobile ? <OverviewMobile /> : <Overview />;
            case 'rewards':
                return isMobile ? <RewardsMobile /> : <Rewards />;
            case 'community':
                return isMobile ? <CommunityMobile /> : <Community />;
            case 'extras':
                return isMobile ? <ExtrasMobile /> : <Extras />;
            default:
                return isMobile ? <OverviewMobile /> : <Overview />;
        }
    };

    return (
        <div className="mb-10 md:mb-0 h-auto bg-transparent">
            {isMobile ? <HeaderCrowdfundingMobile /> : <HeaderCrowdfunding />}
            {isMobile ? (
                <div>
                    <NavBarCrowdfundingMobile 
                        setActiveSection={setActiveSection} 
                        activeSection={activeSection} 
                    />
                    <NavBarCrowdfundingMobileStatic
                        setActiveSection={setActiveSection}
                        activeSection={activeSection}
                    />

                </div>
            ) : (
                <NavBarCrowdfunding 
                    setActiveSection={setActiveSection} 
                    activeSection={activeSection} 
                />
            )}
            <div>{renderSection()}</div>
            <Footer />
        </div>
    );
}
