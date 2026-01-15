import { SignUp } from "@clerk/clerk-react"

const AppSignUp = () => {
  return (
    <SignUp signInUrl="/sign-in" />
  )
}

export default AppSignUp