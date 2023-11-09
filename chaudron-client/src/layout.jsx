import { Outlet } from "react-router-dom"
import Footer from "./footer"
import Header from "./header"

function Layout() {
    return (
    <div className="home-container">

      <Header />
      <Outlet />
      <Footer />
    </div>
    )
}

export default Layout


