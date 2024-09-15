import { Fragment, useEffect, useState } from "react"
import ApiServices, { styleObj } from "../Services/ApiServices"
import { toast } from "react-toastify"

import { Link, useParams, Navigate } from "react-router-dom"
export default function ViewReviews() {
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  let { id } = useParams()
  useEffect(() => {
    let data = {
      userId: sessionStorage.getItem("userId")
    }
    ApiServices.allRating(data).then((res) => {
      setData(res.data.data)
      setTimeout(() => { setLoad(false) }, 1000)
    }).catch((err) => {
      toast.error("Something went Wrong.Try again later!")
      setTimeout(() => { setLoad(false) }, 1000)
    })
  }, [load])

  const getLatestReviews = (reviews) => {
    const latestReviews = {};

    reviews?.forEach((review) => {
      const packageId = review?.packageId?._id;
      if (!latestReviews[packageId] || new Date(review.createdAt) > new Date(latestReviews[packageId].createdAt)) {
        latestReviews[packageId] = review;
      }
    });

    return Object.values(latestReviews);
  };

  const filteredData = getLatestReviews(data);


  const token = sessionStorage.getItem("token")
  if (!token) {
    toast.error("Please Login")
    return <Navigate to="/login" />
  }
  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Ratings
              </h1>
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
                    Ratings
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}
      {/* Package Start */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              My Ratings
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            {
              filteredData?.length > 0 ?
                filteredData?.map((el, index) => (
                  <Fragment key={index}>
                    <div className="col-lg-8 text-capitalize col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div className="package-item">
                        <div className="text-center p-4">
                          <h2>{el?.packageId?.name}</h2>
                          <h3 className="mb-0">
                            {el?.rating}
                            <i className="fa fa-star text-warning"></i>
                          </h3>
                          <p>
                            {el?.review}
                          </p>


                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))
                :
                <h1>No Ratings found </h1>
            }

          </div>
        </div>
      </div>
      {/* Package End */}


      {/* Process Start */}
    </>

  )
}