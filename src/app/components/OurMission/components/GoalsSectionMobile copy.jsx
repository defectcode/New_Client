import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import Support from './Support';
import { motion } from 'framer-motion';
import Modal from '/src/app/components/Header/components/Modal.jsx';
import SupportForm from '/src/app/components/Header/components/Payment/SupportForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { goals } from '../constants/goals';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GoalsSectionMobile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [isLastSectionVisible, setIsLastSectionVisible] = useState(false);
    const sectionRefs = useRef([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleScroll = throttle(() => {
        if (typeof window !== 'undefined') {
            const scrollY = window.scrollY;
            const sectionHeight = window.innerHeight / 2;
            const newSection = Math.min(goals.length - 1, Math.floor(scrollY / sectionHeight));
            setCurrentSection(newSection);

            // Check if the last section is visible
            const lastSection = sectionRefs.current[goals.length - 1];
            if (lastSection) {
                const lastSectionTop = lastSection.offsetTop;
                const viewportBottom = scrollY + window.innerHeight;
                setIsLastSectionVisible(viewportBottom >= lastSectionTop);
            }
        }
    }, 200);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div className="bg-black h-auto text-white py-6 px-4">
            {goals.map((goal, index) => (
                <motion.div
                    ref={el => sectionRefs.current[index] = el}
                    key={goal.id}
                    className={`goal-section relative w-full max-w-sm mx-auto bg-[#0D0D0D] rounded-lg overflow-hidden ${
                        currentSection >= index ? 'opacity-100' : 'opacity-0'
                    }`}
                    initial="hidden"
                    animate={currentSection >= index ? 'visible' : 'hidden'}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        willChange: 'opacity, transform',
                        marginBottom: '40px',
                        marginTop: index === 0 ? '250px' : '300px',
                    }}
                >
                    <img src={goal.Mobile} alt={goal.title} className="w-full h-auto object-cover" />
                    <div
                        className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end"
                    >
                        <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Avenir Heavy, sans-serif' }}>
                            Goal {goal.id}
                        </h3>
                        <h2 className="text-2xl text-white mb-4 font-ekmukta-extrabold">{goal.title}</h2>
                        <p className="text-[16px] text-[#FFFFFF] font-extralight mb-6">
                            {goal.description}
                        </p>
                        <Support onClick={openModal} />
                    </div>
                </motion.div>
            ))}
            {/* Adjusted spacer height for proper spacing */}
            <div style={{ height: '100px' }}></div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Elements stripe={stripePromise}>
                    <SupportForm />
                </Elements>
            </Modal>
        </motion.div>
    );
}

export default GoalsSectionMobile;
