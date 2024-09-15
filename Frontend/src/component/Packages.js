import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import ApiServices, { BASE_URL } from "../Services/ApiServices"
export default function Packages() {
  const [packageData, setPackageData] = useState([])
  
  let params = useParams()
  console.log(params.id);
  const id = params.id

  useEffect(() => {
    window.scrollTo(3, 0)
    let data={
      destinationId:id
    }
    ApiServices.allpackages(data)
      .then((response) => {
        console.log(response);
        setPackageData(response.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  return (
    <Fragment>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">Packages</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Packages
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Packages
            </h6>
            <h1 className="mb-5">Awesome Packages</h1>
          </div>
          <div className="row g-4 justify-content-center">

            {packageData?.map((el, index) => (
              <Fragment key={index}>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">



                  <div className="package-item">
                      <div className="overflow-hidden">
                          <img className="img-fluid" style={{ height: "43vh" ,width:"100%" }} src={BASE_URL + el?.destinationId?.image} />
                      </div>
                      <div className="d-flex border-bottom">
                          <small className="flex-fill text-center border-end py-2">
                              <i className="fa fa-map-marker-alt text-primary me-2" />
                              {el.destinationId.name}
                          </small>
                          <small className="flex-fill text-center border-end py-2">
                              <i className="fa fa-calendar-alt text-primary me-2" />{el.duration}
                          </small>
                          <small className="flex-fill text-center py-2">
                              <i className="fa fa-user text-primary me-2" />Per Person
                          </small>
                      </div>
                      <div className="text-center p-4" style={{ height: "45vh" }}>
                          <h3 className="mb-3" style={{ height: "10vh" }}>{el.name}</h3>
                          <h2 className="mb-0">&#8377; {el.price}</h2>
                          <Link to={"/addReview/"+ el.packageId?._id} className="mb-3">
                              <small className="fa fa-star text-primary" />
                              <small className="fa fa-star text-primary" />
                              <small className="fa fa-star text-primary" />
                              <small className="fa fa-star text-primary" />
                              <small className="fa fa-star text-primary" />
                          </Link>
                          <p className="mb-3">
                              {el.destinationId.address}
                          </p>
                          <div className="d-flex justify-content-center mb-2">


                              <Link to={"/booking/" + el._id} className="btn btn-primary px-3"
                                  style={{ borderRadius: "10px", width: "50%" }}>Book Now</Link>
                          </div>
                      </div>
                  </div>

              </div>
          </Fragment>

            ))}

          </div>
        </div>
      </div>

    </Fragment>
  )
}