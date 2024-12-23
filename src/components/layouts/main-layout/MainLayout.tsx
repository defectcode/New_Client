'use client'

import { PropsWithChildren } from 'react'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { usePathname } from 'next/navigation'
import '../style/main.css'


export function MainLayout({ children }: PropsWithChildren<unknown>) {
    const pathname = usePathname();


    const isHomePage = pathname === '/';

    if (isHomePage) {
        return (
            <div className="flex flex-col h-full bg-[#F9F9F9]">
                <div className="flex-1">
                    <main className="">{children}</main>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#F9F9F9]">
            <div className="flex-1">
                <Header />
                <main className="md:mx-5 lg:mx-14">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
