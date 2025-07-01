'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const navItems = [
    { label: 'Home', href: '/'},
    { label: 'Assistant', href: '/assistant'},
    { label: 'My Journey', href: '/my-journey'},
]

const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className='w-full flex justify-between items-center px-14 max-sm:px-4 py-2 bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.2)]'>
            <Link href='/'>
                <div>
                    <Image 
                        src='/images/IELTSpeak.png'
                        alt='logo'
                        width={80}
                        height={80}
                    />
                </div>
            </Link>
            <div>
                <div className='flex items-center gap-5'>
                    {navItems.map(({label, href}) => (
                        <Link 
                            key={label} 
                            href={href}
                            className={cn(pathname === href && 'font-bold')}
                        >
                            {label}
                        </Link>
                    ))}
                    <SignedOut>
                        <SignInButton>
                            <button className='border border-black rounded-4xl px-4 py-2 font-semibold
                                                flex items-center cursor-pointer'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

        </nav>
    )
}

export default Navbar