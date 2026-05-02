import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            <NavBar />
            <div className="flex-grow pt-20 pb-16">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;