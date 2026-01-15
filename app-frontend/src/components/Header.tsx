import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "antd"

const Header = () => {
  return (
    <header className="bg-red-300 py-8 text-white">
      <div className="flex justify-between items-center">
        <div></div>
        <Link to={"/"}>Webshop Project</Link>
        <div>
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