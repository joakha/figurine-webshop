import { SignUp } from "@clerk/clerk-react"

const AppSignUp = () => {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <SignUp signInUrl="/sign-in" />
    </div>

  )
}

export default AppSignUp