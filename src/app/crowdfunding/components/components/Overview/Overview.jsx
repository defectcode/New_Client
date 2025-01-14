import React from 'react';
import StageDescription from './components/StageDescription';
import FundingBreakdown from './components/FundingBreakdown';

const Overview = () => {
    return (
        <div className="flex justify-center w-full bg-black py-8">
            <div className="flex max-w-[1200px] w-full">
                <div className="w-2/3">
                    <StageDescription />
                </div>
                <div className="w-1/3">
                    <FundingBreakdown />
                </div>
            </div>
        </div>
    );
}

export default Overview;
