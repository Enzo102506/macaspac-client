import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-slate-950 to-orange-950 text-white">
            <NavBar />
            <div className="flex-grow pt-20 pb-16">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;