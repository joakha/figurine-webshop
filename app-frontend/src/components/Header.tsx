import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "antd"
import { useUser } from "@clerk/clerk-react";

const Header = () => {

  const { user } = useUser();

  const role = user?.publicMetadata?.userRole;

  return (
    <header className="bg-red-400 py-8 text-white">
      <div className="flex justify-between items-center">
        <div className="pl-10">{user?.username}</div>

        <Link className="font-bold text-2xl" to={"/"}>Webshop Project</Link>

        <div className="pr-10">
          <SignedOut>
            <Link to={"/sign-in"}>
              <Button type="primary">Sign In</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            {role === "admin" &&
              <Link to={"/add-product"}>
                <Button type="primary">Add a new Product</Button>
              </Link>}
            <UserButton />
          </SignedIn>
        </div>

      </div>
    </header >
  )
}

export default Header