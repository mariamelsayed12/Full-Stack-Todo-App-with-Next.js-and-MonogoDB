import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <div className='mx-auto w-full h-full'>
            <SignIn forceRedirectUrl="/" />
            </div>
}