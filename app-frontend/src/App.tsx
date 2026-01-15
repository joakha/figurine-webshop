import { Button } from "antd"
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import AppSignUp from "./components/AppSignUp"
import AppSignIn from "./components/AppSignIn"

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-amber-600'>
        <Header />
        <Routes>
          <Route path="/" element={<div><Button type="primary" >hello</Button></div>}></Route>
          <Route path="/sign-up" element={<AppSignUp />}></Route>
          <Route path="/sign-in" element={<AppSignIn />}></Route>
          <Route path="/account" element={<div>hi</div>}></Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>

      </div>
    </>
  )
}

export default App
