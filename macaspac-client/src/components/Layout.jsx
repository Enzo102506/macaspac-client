import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900">
            <Navbar />
            <div className="pb-16 pt-20">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;