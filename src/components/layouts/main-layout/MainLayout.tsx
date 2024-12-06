import { PropsWithChildren } from 'react'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className="flex flex-col h-full bg-[#F9F9F9]">
			<div className="flex-1">
				<Header />
				<main className="md:mx-5 lg:mx-14">{children}</main>
				<Footer />
			</div>
		</div>
	)
}
