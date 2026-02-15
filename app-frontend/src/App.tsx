import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import AppSignUp from "./components/AppSignUp"
import AppSignIn from "./components/AppSignIn"
import FrontPage from "./components/FrontPage"
import AddItem from "./components/AddItem"
import EditItem from "./components/EditItem"

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-slate-200'>
        <Header />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/sign-up" element={<AppSignUp />} />
            <Route path="/sign-in" element={<AppSignIn />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/edit-item/:itemId" element={<EditItem />} />
            {/* catch-all route */}
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
    </>
  )
}

export default App
