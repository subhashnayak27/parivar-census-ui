import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function MainLayout() {

    return (

        <>

            <Navbar />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2 p-0">

                        <Sidebar />

                    </div>

                    <div className="col-md-10 p-4">

                        <Outlet />

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default MainLayout;