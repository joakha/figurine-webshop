import { SignIn } from '@clerk/clerk-react'

const AppSignIn = () => {
    return (
        <div className='flex flex-1 justify-center items-center'>
            <SignIn signUpUrl='/sign-up' />
        </div>
    )
}

export default AppSignIn