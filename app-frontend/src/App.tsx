import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import AppSignUp from "./components/AppSignUp"
import AppSignIn from "./components/AppSignIn"
import FrontPage from "./components/FrontPage"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import AdminRouteWrapper from "./components/AdminRouteWrapper"
import CartPage from "./components/CartPage"
import AccountPurchases from "./components/AccountPurchases"
import PurchaseDashBoard from "./components/PurchaseDashboard"
import { notification } from "antd"

function App() {

  const [notificationApi, notificationContextHolder] = notification.useNotification();

  return (
    <>
      <div className='flex flex-col min-h-screen bg-slate-200'>
        {notificationContextHolder}
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
          <Route
            path="/purchase-dashboard"
            element={
              <AdminRouteWrapper>
                <PurchaseDashBoard />
              </AdminRouteWrapper>
            }
          />
          {/* public routes */}
          <Route path="/" element={<FrontPage notificationApi={notificationApi} />} />
          <Route path="/sign-up" element={<AppSignUp />} />
          <Route path="/sign-in" element={<AppSignIn />} />
          <Route path="/your-cart" element={<CartPage />} />
          <Route path="/your-purchases" element={<AccountPurchases />} />
          {/* catch-all route */}
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
