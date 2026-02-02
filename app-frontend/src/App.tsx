import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import AppSignUp from "./components/AppSignUp"
import AppSignIn from "./components/AppSignIn"
import FrontPage from "./components/FrontPage"

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-slate-200'>
        <Header />
          <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/sign-up" element={<AppSignUp />}></Route>
            <Route path="/sign-in" element={<AppSignIn />}></Route>
            {/* catch-all route */}
            <Route path="*" element={<Navigate to={"/"} />}></Route>
          </Routes>
        </div>
    </>
  )
}

export default App
