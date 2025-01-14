'use client';
import React, { useState, useEffect, useRef } from 'react';
import Support from './Support';
import { motion } from 'framer-motion';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useWindowDimensions from './useWindowDimensions'; 
import { goals } from '../constants/goals';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GoalsSection = () => {
    const { width } = useWindowDimensions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRefs = useRef([]);
    const [visibleSections, setVisibleSections] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                let newVisibleSections = [];

                sectionRefs.current.forEach((section, index) => {
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const sectionTop = rect.top + scrollY;

                        if (scrollY + windowHeight > sectionTop) {
                            newVisibleSections.push(index);
                        }
                    }
                });

                setVisibleSections(newVisibleSections);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <motion.div
            className="bg-black h-auto text-white pt-6 pb-6 px-4 lg:px-0"
            style={{ minHeight: '100vh' }}
        >
            {goals.map((goal, index) => (
                <motion.div
                    ref={el => sectionRefs.current[index] = el}
                    key={goal.id}
                    className={`relative w-full lg:h-[540px] flex items-center justify-center ${index !== 0 ? 'mt-6' : ''} mx-auto transition-all duration-500 ease-in-out`}
                    style={{
                        opacity: visibleSections.includes(index) ? 1 : 0,
                        transform: visibleSections.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                        backgroundImage: `url(${goal.imageDesktop})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="max-w-screen-xl w-full mx-auto px-4 lg:px-0 flex items-center justify-center">
                        <div className={`w-full max-w-[1500px] px-8 flex ${goal.id % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                            <div className={`lg:w-[400px] p-4 flex font-ekMukta flex-col ${goal.id % 2 !== 0 ? 'ml-0 lg:mr-10' : 'mr-0 lg:ml-10'}`}>
                                {/* Am adăugat clasele `ml-0 lg:mr-10` pentru elementele impare și `mr-0 lg:ml-10` pentru elementele pare */}
                                <h3 className="text-xl font-extrabold mb-2 flex gap-1 text-[#C1C1C1]" style={{ fontFamily: 'Avenir Heavy, sans-serif', fontWeight: 400 }}>
                                    Goal <div className='font-bold' style={{ fontFamily: 'Avenir, sans-serif' }}>{goal.id}</div>
                                </h3>
                                <h2 className="text-[24px] lg:text-[32px] text-[#FFFFFF] mb-4 font-ekmukta-extrabold">{goal.title}</h2>
                                <p className="mb-6 text-[#F1F1F1] text-[16px] lg:w-[365px] font-extralight">{goal.description}</p>
                                <Support onClick={openModal} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </motion.div>
    );
}

export default GoalsSection;
