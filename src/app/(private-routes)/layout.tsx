import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Header } from '@/components'

interface PrivateLayoutProps {
	children: ReactNode
}

interface SessionProps {
	token: string
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
	const session: any = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	return (
		<div className='min-h-screen  bg-gray-800'>
			<div className='min-h-screen max-w-7xl mx-auto grid grid-rows-[auto,1fr,auto]'>
			<header className=''>
				<Header />
			</header>
			<main>
				<div className='bg-gray-200 min-h-full'>
					{children}
				</div>
			</main>
			<footer>
				<div className='bg-lime-700 text-center'>
					<h1>footer</h1>
				</div>
			</footer>
			</div>

		</div>
	)
}