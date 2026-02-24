import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import AppSignUp from "./components/AppSignUp"
import AppSignIn from "./components/AppSignIn"
import FrontPage from "./components/FrontPage"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import AdminRouteWrapper from "./components/AdminRouteWrapper"

function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-slate-200'>
        <Header />
        <Routes>
          {/* admin routes */}
          <Route
            path="/add-product"
            element={
              <AdminRouteWrapper>
                <AddProduct />
              </AdminRouteWrapper>
            }
          />
          <Route
            path="/edit-product/:productId"
            element={
              <AdminRouteWrapper>
                <EditProduct />
              </AdminRouteWrapper>
            }
          />
          {/* public routes */}
          <Route path="/" element={<FrontPage />} />
          <Route path="/sign-up" element={<AppSignUp />} />
          <Route path="/sign-in" element={<AppSignIn />} />
          {/* catch-all route */}
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
