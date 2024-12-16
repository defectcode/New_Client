import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PUBLIC_URL } from '@/config/url.config';
import './style/Hero.css';

export function Hero() {
    return (
        <div className="image--bg">
            <div className="hero-content md:items-center ">
				<div className='flex flex-col items-center justify-center'>
					<h1 className="text-4xl font-bold md:leading-[1] leading-[1]">VELLOV</h1>
					<p>New collection 2025</p>
					<Link href={PUBLIC_URL.explorer()} className='md:block hidden'>
						<Button
							variant="primary"
							className="flex items-center justify-center bg-[#FFFFFF] text-black hover:bg-gray-200 py-2 px-5 rounded-[10px] md:w-[260px] h-[48px]"
						>
							Catalog
							<ArrowRight className="ml-2 size-4" />
						</Button>
					</Link>
				</div>
            </div>
        </div>
    );
}
