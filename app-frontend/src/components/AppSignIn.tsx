import { SignIn } from '@clerk/clerk-react'

const AppSignIn = () => {
    return (
        <div>
            <SignIn signUpUrl='/sign-up' />
        </div>
    )
}

export default AppSignIn