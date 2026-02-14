import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "antd"

const Header = () => {
  return (
    <header className="bg-red-400 py-8 text-white">
      <div className="flex justify-between items-center">
        <div className="pl-10">Welcome!</div>

        <Link className="font-bold text-2xl" to={"/"}>Webshop Project</Link>

        <div className="pr-10">
          <SignedOut>
            <Link to={"/sign-in"}>
              <Button type="primary">Sign In</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

      </div>
    </header >
  )
}

export default Header