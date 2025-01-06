'use client';

import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] text-center px-4">
			<h1 className="text-6xl font-bold text-[#1E1E1E] mb-4">404</h1>
			<h2 className="text-2xl font-semibold text-[#6F6F6F] mb-6">Page Not Found</h2>
			<p className="text-lg text-[#8C8C8C] mb-8">
				The page you are looking for does not exist or has been moved.
			</p>
			<Link href="/" className="bg-[#1E1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#111111] transition">
				Go Back Home
			</Link>
		</div>
	);
}
