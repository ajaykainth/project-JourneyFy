import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

export default function AdminMaster() {
    return (
        <Fragment>

            <AdminHeader />
            <Outlet />
            <Footer />
            

        </Fragment>
    )
}