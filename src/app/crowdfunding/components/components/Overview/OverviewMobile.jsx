import React from 'react';
import StageDescriptionMobile from './components/StageDescriptionMobile';
// import DetailedStepsMobile from './components/DetailedStepsMobile';
import FundingBreakdownMobile from './components/FundingBreakdownMobile';

const OverviewMobile = () => {
    return (
        <div className="">
                <StageDescriptionMobile />
                <FundingBreakdownMobile />
        </div>
    );
}

export default OverviewMobile;
