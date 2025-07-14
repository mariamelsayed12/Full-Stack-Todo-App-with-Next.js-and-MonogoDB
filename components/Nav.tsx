import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'


const Nav = () => {
    return (
    <nav className=' mx-auto space-y-5 mb-5 pt-2  max-w-7xl flex items-center justify-between'>
        <ModeToggle/>
            <SignedIn>
                {/* Appear if user only sighned in or sighned up */}
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
    </nav>
    )
}

export default Nav