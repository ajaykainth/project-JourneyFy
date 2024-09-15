import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import HotelHeader from "./HotelHeader";
import Footer from "./Footer";

export default function HotelMaster() {
    return (
        <Fragment>

            <HotelHeader />
            <Outlet />
            <Footer />
            

        </Fragment>
    )
}