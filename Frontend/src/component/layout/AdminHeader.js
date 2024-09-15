import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Header() {
  const nav = useNavigate()
  const logout = () => {
   
    if (window.confirm("Do you want to logout?")) {
      sessionStorage.clear()
      toast.success("Logout successfully")
      nav("/login")

    }
  }
  return (
    <Fragment>
      <>

        {/* Topbar End */}
        {/* Navbar & Hero Start */}
        <div className="container-fluid position-relative p-0">

          <nav className="navbar navbar-expand-lg navbar-lighttt px-4 px-lg-5 py-3 py-lg-0 ">
            <a href="" className="navbar-brand p-0">
              <h1 className="text-primary m-0">
                <i className="fa fa-map-marker-alt me-3" />
                JourneyFy
              </h1>
              {/* <img src="img/logo.png" alt="Logo"> */}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto py-0">
                <Link to={"/admin"} className="nav-item nav-link">
                  Home
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Destination
                  </a>
                  <div className="dropdown-menu m-0">

                    <Link to={"/admin/adddestination"} className="dropdown-item">
                      Add Destinations
                    </Link>
                    <Link to={"/admin/managedestination"} className="dropdown-item">
                      Manage Destinations
                    </Link>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <Link
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Hotel
                  </Link>
                  <div className="dropdown-menu m-0">

                    <Link to={"/admin/addhotel"} className="dropdown-item">
                      Add Hotel
                    </Link>
                    <Link to={"/admin/managehotel"} className="dropdown-item">
                      Manage Hotel
                    </Link>
                  </div>
                </div>
                {/* <div className="nav-item dropdown">
            <Link
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Rooms
            </Link>
            <div className="dropdown-menu m-0">
              <Link to={"/admin/rooms"} className="dropdown-item">
                All Rooms
              </Link>
            </div>
          </div> */}


                <div className="nav-item dropdown">

                  <Link
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Packages
                  </Link>
                  <div className="dropdown-menu m-0">

                    <Link to={"/admin/addpackage"} className="dropdown-item">
                      Add Package
                    </Link>
                    <Link to={"/admin/managepackage"} className="dropdown-item">
                      Manage Package
                    </Link>

                  </div>

                </div>

                <div className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    View
                  </Link>
                  <div className="dropdown-menu m-0">
                    <Link to="/admin/Vieworder" className="dropdown-item">
                      Booking
                    </Link>
                    <Link to="/admin/Viewuser" className="dropdown-item">
                      Users
                    </Link>

                    <Link to="/admin/view-rating" className="dropdown-item">
                      Ratings
                    </Link>


                  </div>

                </div>

              </div>
              <a onClick={logout} className="btn btn-primary rounded-pill py-2 px-4">
                Logout
              </a>
            </div>
          </nav>

        </div>
      </>

    </Fragment>

  )
}