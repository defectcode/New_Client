import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import './style/Hero.css';
import { PUBLIC_URL } from '@/config/url.config';

export function Hero() {
    return (
        <div className="image--bg">
            <div className="container">
                <div className="center-text md:block hidden">
                    <p>Your energy. Your style.</p>
                </div>

                <h1 className="logo md:block hidden">VELLOV</h1>

                <div className="catalog-button md:block hidden">
                    <Link href={PUBLIC_URL.explorer()}>
                        <button>
                            Catalog
                            <ArrowRight className="ml-2 size-4" />
                        </button>
                    </Link>
                </div>


                <div className="md:hidden absolute bottom-0 w-full bg-[#FFFFFF]/10 rounded-[10px] h-[86px] backdrop-blur-md">
                    <div className="w-full flex items-center justify-between rounded-[10px] h-[86px] px-5">
                        <div>
                            <h1 className="logo text-lg font-bold">VELLOV</h1>
                            <p>Your energy. Your style.</p>
                        </div>

                        <div className="catalog-button flex items-center">
                            <Link href={PUBLIC_URL.explorer()}>
                                <button className="bg-white text-black px-4 py-2 rounded-md">
                                    Catalog
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
