import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-blue-400 py-8 text-white">
      <div className="flex justify-between items-center">
        <div></div>
        <Link to={"/"}>Webshop Project</Link>
        <div>navigation links here</div>
      </div>
    </header>
  )
}

export default Header