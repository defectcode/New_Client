import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Image from 'next/image';

const costData = [
    { category: 'Research & Analysis:', cost: 12000, week: '6-8' },
    { category: 'Creating Main Idea', cost: 10000, week: '3-4' },
    { category: 'Describing the Series', cost: 10000, week: '5-6' },
    { category: 'Developing Characters:', cost: 10000, week: '7-9' },
    { category: 'Defining Thematic Aspects: ', cost: 8000, week: '3-4' },
    { category: 'Coordinating Team Work:', cost: 12000, week: '2-5' },
    { category: 'Consultations with ', cost: 12000, week: '1-2' },
];

// Function to generate a color gradient from red to white
const generateColorGradient = (steps) => {
    const startColor = [255, 0, 0]; // Red in RGB
    const endColor = [255, 255, 255]; // White in RGB

    const stepFactor = 1 / (steps - 1);
    const colorArray = [];

    for (let i = 0; i < steps; i++) {
        const r = Math.round(startColor[0] + stepFactor * i * (endColor[0] - startColor[0]));
        const g = Math.round(startColor[1] + stepFactor * i * (endColor[1] - startColor[1]));
        const b = Math.round(startColor[2] + stepFactor * i * (endColor[2] - startColor[2]));
        colorArray.push(`rgb(${r},${g},${b})`);
    }

    return colorArray;
};

const calculateTotalCost = () => {
    return costData.reduce((total, item) => total + item.cost, 0);
};

const DoughnutChart = ({ data }) => {
    const colors = generateColorGradient(data.length); // Generate colors based on the number of categories

    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                data: data.map(item => item.cost),
                backgroundColor: colors,
                borderWidth: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div style={{ width: '250px', height: '250px' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

const FundingBreakdownMobile = () => {
    const [totalCost, setTotalCost] = useState(calculateTotalCost());

    useEffect(() => {
        setTotalCost(calculateTotalCost());
    }, []);

    return (
        <div className="bg-black h-[90%] sticky top-0 flex flex-col items-center text-white px-5 pb-10">
            <h2 className="text-2xl font-semibold font-ekMukta mb-8 mt-10">Where Your Money Goes</h2>
            <div className="relative">
                <DoughnutChart data={costData} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">${totalCost.toLocaleString()}</span>
                </div>
            </div>
            <div className="mt-8 w-full max-w-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className='font-bold text-[14px] font-roboto text-[#F5F5F7]'>
                            <th className="py-2">Category</th>
                            <th className="py-2 text-center">
                                <div className="relative flex items-center justify-center gap-1">
                                    <span style={{ display: 'inline-block' }}>Cost</span>
                                    <span style={{ display: 'inline-block', transform: 'translateY(-7px)' }} title="Information about costs">
                                        <Image src="/icons/question.svg" alt='question' width={15} height={15} />
                                    </span>
                                </div>
                            </th>
                            <th className="py-2 text-center">
                                <div className="relative flex items-center justify-center gap-1">
                                    <span style={{ display: 'inline-block' }}>Week</span>
                                    <span style={{ display: 'inline-block', transform: 'translateY(-7px)' }} title="Information about weeks">
                                        <Image src="/icons/question.svg" alt='question' width={15} height={15} />
                                    </span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='space-y-[20px]'>
                        {costData.map((item, index) => (
                            <tr key={index} className='align-middle'>
                                <td className="py-5 flex items-center relative align-middle" style={{ paddingBottom: index < costData.length - 1 ? '' : '0' }}>
                                    <div className="relative flex flex-col items-center point-container align-middle">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.4, duration: 0.5 }}
                                            className="w-[13px] h-[13px] rounded-full point align-middle"
                                            style={{ backgroundColor: generateColorGradient(costData.length)[index] }}
                                        />
                                        {index < costData.length - 1 && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: index === costData.length - 2 ? '70px' : '95px' }}
                                                transition={{ delay: (index + 1) * 0.4, duration: 0.5 }}
                                                className="absolute left-1/2 transform -translate-x-1/2 w-[2px] align-middle gap-1"
                                                style={{ backgroundColor: generateColorGradient(costData.length)[index] }}
                                            />
                                        )}
                                    </div>
                                    <span className="ml-3 text-[#C4C4C4] text-[14px] font-roboto align-middle">{item.category}</span>
                                </td>
                                <td className={`${index < costData.length - 1 ? 'py-2' : 'pt-4'} text-[#C4C4C4] text-[14px] font-roboto font-semibold w-[100px] align-middle text-center`}>
                                    ${item.cost.toLocaleString()}
                                </td>
                                <td className={`${index < costData.length - 1 ? 'py-2' : 'pt-4'} text-[#C4C4C4] text-[14px] font-roboto font-semibold w-[60px] text-center align-middle`}>
                                    {item.week}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .point-container {
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .point-container::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    background-color: currentColor;
                    z-index: -1;
                }
                .point-container:first-child::after {
                    top: 50%;
                    height: 50%;
                }
            `}</style>
        </div>
    );
};

export default FundingBreakdownMobile;
