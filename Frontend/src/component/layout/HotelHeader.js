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
      <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <small className="me-3 text-light">
                <i className="fa fa-map-marker-alt me-2" />
                Location, City, Country
              </small>
              <small className="me-3 text-light">
                <i className="fa fa-phone-alt me-2" />
                +012 345 6789
              </small>
              <small className="text-light">
                <i className="fa fa-envelope-open me-2" />
                ajay@example.com
              </small>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: 45 }}
            >
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-twitter fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-facebook-f fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-linkedin-in fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                href=""
              >
                <i className="fab fa-instagram fw-normal" />
              </a>
              <a
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                href=""
              >
                <i className="fab fa-youtube fw-normal" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ------------Navbar-------------- */}
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
              <Link to={"/hotel"} className="nav-item nav-link">
                Home
              </Link>

              <div className="nav-item dropdown">
                <Link
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Rooms
                </Link>
                <div className="dropdown-menu m-0">
                  <Link to={"/hotel/addroom"} className="dropdown-item ">
                    Add Room
                  </Link>

                  <Link to={"/hotel/manageroom"} className="dropdown-item">
                    Manage Room
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



    </Fragment>

  )
}