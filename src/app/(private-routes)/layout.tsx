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
		<div className="bg-gray-800 min-h-screen ">
			<div className="bg-gray-200 mx-auto max-w-7xl min-h-screen px">
				<Header />
				<div className='px-4'>
					{children}
				</div>
			</div>
		</div>
	)
}