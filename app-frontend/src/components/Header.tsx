import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from "antd"
import useProductCart from "../hooks/useProductCart";

const Header = () => {

  const { user } = useUser();
  const { productCount } = useProductCart();

  const role = user?.publicMetadata?.userRole;

  return (
    <header className="bg-red-400 py-8 text-white w-full">
      <div className="flex justify-between items-center">
        <div className="pl-10">{user?.username}</div>

        <Link className="font-bold text-2xl" to={"/"}>Webshop Project</Link>

        <div className="flex items-center gap-4 pr-10">
          <SignedOut>
            <Link to={"/sign-in"}>
              <Button type="primary">Sign In</Button>
            </Link>
          </SignedOut>

          <SignedIn>
            {role === "admin" ? (
              <div className="flex gap-4">
                <Link to={"/add-product"}>
                  <Button type="primary">Add a new Product</Button>
                </Link>

                <Link to={"/purchase-dashboard"}>
                  <Button type="primary">Manage Purchases</Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to={"/your-cart"}>
                  <Button type="primary">Cart ({productCount})</Button>
                </Link>

                <Link to={"/your-purchases"}>
                  <Button type="primary">Purchases</Button>
                </Link>
              </div>)}
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header >
  )
}

export default Header