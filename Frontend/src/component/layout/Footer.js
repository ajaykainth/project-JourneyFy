import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ApiServices, { BASE_URL } from "../../Services/ApiServices";
export default function () {
  const [destination, setDestination] = useState([])
  useEffect(() => {

    ApiServices.alldestination()
      .then((res) => {
        setDestination(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  },[])
  return (
    <Fragment>
      <div
        className="container-fluid bg-dark text-light footer pt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3">Company</h4>
              <Link className="btn btn-link" href="">
                About Us
              </Link>
              <Link className="btn btn-link" href="">
                Contact Us
              </Link>
              <Link className="btn btn-link" href="">
                Privacy Policy
              </Link>
              <Link className="btn btn-link" href="">
                Terms &amp; Condition
              </Link>
              <Link to={"/Faq"} className="btn btn-link" href="">
                FAQs &amp; Help
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Phagwara,Punjab, INDIA
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +91 771063XXXX
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                ajaykainth@gmail.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-youtube" />
                </Link>
                <Link className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-linkedin-in" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                {destination?.slice(0, 6).map((destination, index) => (
                  <Fragment key={index}>
                    <div className="col-4 col-xs-12" >
                      <img
                        className="img-fluid bg-light p-1"
                        src={BASE_URL + destination.image}
                        style={{ height: "6rem", width: "100%" }}
                        alt=""
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>

          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{"2024 "}

                <Link to={"/"} className="border-bottom" href="">
                  Journeyfy
                </Link>
                , Designed By{" "}
                <Link className="border-bottom" href="#">
                  Ajay Kainth
                </Link>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href="#">Home</a>               
                  <Link to={"/faq"}>Help</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </Fragment>
  )
}