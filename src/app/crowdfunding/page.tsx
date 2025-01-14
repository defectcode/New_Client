'use client'
import React, { useState, useEffect } from "react";
import HeaderCrowdfunding from './HeaderCrowdfunding';
import HeaderCrowdfundingMobile from './HeaderCrowdfundingMobile';
import ButonShere from './components/mobile/ButonShere';
import Rewards from './components/components/Rewards/Rewards';
import Community from './components/components/Community/Community';
import Extras from './components/components/Extras/Extras';
import Overview from './components/components/Overview/Overview';
import OverviewMobile from "./components/components/Overview/OverviewMobile";
import RewardsMobile from "./components/components/Rewards/RewardsMobile";
import CommunityMobile from "./components/components/Community/CommunityMobile";
import ExtrasMobile from "./components/components/Extras/ExtrasMobile";
import Footer from '../components/Footer/Footer';
import FooterMobile from '../components/Footer/FooterMobile';
import NavBarCrowdfundingMobile from "@/app/crowdfunding/components/mobile/NavBarCrowdfundingMobile";
import NavBarCrowdfunding from "@/app/crowdfunding/components/NavBarCrowdfunding";
import useDeviceType from './components/hooks/useDeviceType';
import { Header } from "@/components/layouts/main-layout/header/Header";

const Crowdfunding: React.FC = () => {
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState<string>('overview');

    useEffect(() => {
        if (window.location.hash) {
            setActiveSection(window.location.hash.substring(1));
        }

        const handleHashChange = () => {
            setActiveSection(window.location.hash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderSection = (): JSX.Element => {
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
        <div className="mb-10 md:mb-0 bg-black h-auto">
            <Header/>
            {isMobile ? <HeaderCrowdfundingMobile /> : <HeaderCrowdfunding />}
            {isMobile ? <NavBarCrowdfundingMobile setActiveSection={setActiveSection} /> : <NavBarCrowdfunding setActiveSection={setActiveSection} />}
            {/* {isMobile && <ButonShere />} */}
            <div>
                {renderSection()}
            </div>
            {isMobile ? <Footer /> : <Footer />}
        </div>
    );
};

export default Crowdfunding;
