import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom"
import ApiServices, { BASE_URL } from "../Services/ApiServices"
import Modal from "react-modal"
import FadeLoader from "react-spinners/FadeLoader";
import Aos from "aos";
import Weather from "./Weather";




export default function SingleBooking() {
  const [loading, setLoading] = useState(true);
  const [bookingName, setBookingName] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [guestCount, setGuestCount] = useState("")
  const [idProofName, setIdProofName] = useState("")
  const [idProof, setIdProof] = useState({})
  const [bookingDate, setBookingDate] = useState("")
  
  // const [packageId, setPackageId] = useState("")
  // const [userId, setUserId] = useState("")
  const [packageData, setPackageData] = useState({})

  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  const obj = {
    header: {
      Authorization: sessionStorage.getItem("userId")

    }
  }
  // console.log(obj);
  let params = useParams()
  const id = params.id

  useEffect(() => {
    window.scrollTo(0, 0)
    
Aos.init({ duration: 1500 });
    let data = {
      _id: id
    }
    ApiServices.SinglePackage(data)
      .then((response) => {
        // console.log("single"response);
        setPackageData(response.data.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, [])

  const changeImage = (e) => {
    setIdProofName(e.target.value);
    // console.log(e.target.files[0]);
    setIdProof(e.target.files[0])
  }
  const handleForm = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("bookingName", bookingName)
    data.append("emergencyContact", emergencyContact)
    data.append("guestCount", guestCount)
    data.append("idProof", idProof)
    data.append("userId", sessionStorage.getItem("userId"))
    data.append("packageId", id)
    data.append("bookingDate", bookingDate)

    ApiServices.addbooking(data)
      .then((resp) => {
        if (resp.data.success === true) {
          toast.success(resp.data.message)
          setBookingName("")
          setEmergencyContact("")
          setIdProofName("")
          setIdProof({})
          setGuestCount("")
          setBookingDate("")
          setIsOpen(false)

        } else if (resp.data.success === false) {
          toast.error(resp.data.message)
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong! Try again later")
        console.log(err);
      })
  }


  const nav = useNavigate()
  const getPackageId = (id) => {
    if (!sessionStorage.getItem("userId")) {
      toast.error("Please Login ")
      nav("/login")
    }
    setIsOpen(true)
    setSelectedId(id)
  }


  const handleBookingdate = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('Date cannot be in the past!');
    } else {

      setBookingDate(e.target.value);
    }
  };
  // ---review--
  const [review, setReview] = useState([])
  const Stars = (rating) => {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return fullStars + emptyStars;
  };

  useEffect(() => {
    ApiServices.allReview()
      .then((res) => {
        console.log(res);
        const packageReviews = res.data.data.filter(review => review?.packageId?._id === id);
        setReview(packageReviews)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <div className="preloader">
          <FadeLoader
            color={"#1f9c2e"}

            loading={loading}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="package-image wow fadeIn" data-wow-delay="0.1s" data-aos="fade-up">
            <img className="image-fluid" src={BASE_URL + packageData?.destinationId?.image} />

          </div>




          <Modal isOpen={isOpen} appElement={document.getElementById("root")}
            className="Modal"
            overlayClassName="Overlay">

            <div className="container-xxl py-5 ">
              <div className="container">
                <div className="booking p-5">
                  <button className="cross-btn btn btn-outline-light py-2 px-4 mt-2" onClick={() => { setIsOpen(false) }}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div className="row g-5 align-items-center">
                    <div className="col-md-6 text-white">
                      <h6 className="text-white text-uppercase">Booking</h6>
                      <h1 className="text-white mb-4">Online Booking</h1>



                    </div>
                    <div className="col-md-6">
                      <h1 className="text-white mb-4">Book A Tour</h1>
                      <form onSubmit={handleForm}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control bg-transparent text-white"
                                id="name"
                                value={bookingName} onChange={(e) => { setBookingName(e.target.value) }}
                                placeholder="Your Name"
                              />
                              <label htmlFor="name" className="text-white">Name</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="number"
                                className="form-control bg-transparent text-white"
                                id="email"
                                value={emergencyContact} onChange={(e) => { setEmergencyContact(e.target.value) }}
                                placeholder="contact"
                              />
                              <label htmlFor="email" className="text-white">Contact</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="number"
                                className="form-control bg-transparent text-white"
                                id="email"
                                value={guestCount} onChange={(e) => { setGuestCount(e.target.value) }}
                                placeholder="guest"
                                min={0}
                              />
                              <label htmlFor="guest" className="text-white">Guests</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="file"
                                className="form-control bg-transparent text-white"
                                id="email"
                                value={idProofName} onChange={changeImage}
                                placeholder="IdProof"
                              />

                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-floating">
                              <input
                                type="date"
                                className="form-control bg-transparent text-white"
                                id="email"
                                value={bookingDate} onChange={handleBookingdate}
                                placeholder="date"
                              />

                            </div>
                          </div>


                          <div className="col-12">
                            <button
                              className="btn btn-outline-light w-100 py-3"
                              type="submit"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </Modal>

          {/* -------------------------------------------------------------------------------------- */}


          <hr className="mt-4 " />
          <div className="container package-heading  wow fadeInUp" data-wow-delay="0.1s">
            <div className="package-heading1">
              <h2 className="mb-3">{packageData.name} </h2>
              <h2 className="mb-5 price-font">&#8377; {packageData.price} </h2>
              <div className="p-left-detail">
                <div className="icon">

                  <i className="fa-regular fa-clock"></i>
                  <p>{packageData.duration}</p>
                </div>
                <div className="icon">

                  <i className="fa-solid fa-users"></i>
                  <p>Max People : 26</p>
                </div>
                <div className="icon">

                  <i className="fa-solid fa-wifi"></i>
                  <p>Wifi Available</p>
                </div>
              </div>
              <hr className="mb-5" />

              <div className="description ">
                <p>{packageData.description}</p>
              </div>
              <div className="mt-4 mb-4">
                <button className="proceed-booking" onClick={() => { getPackageId(id) }}>Proceed Booking</button>
              </div>
              <hr />
            </div>
            <div className="text-center">
              <h6 className="section-title bg-white text-center text-primary px-3">Weather</h6>
              <h1 className="mb-5">Seven-Day Sky Report
              </h1>
            </div>
            <div className="package-heading2">{/*------------weather card--------*/}

              {(packageData?.destinationId?.name) &&
                <Weather location={packageData?.destinationId?.name} />

              }

            </div>
          </div>
          <hr />
          <div className="feature__area  wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
              <div className="row align-items-center bg-left mb-60 flex justify-between">
                <div className="col-xl-6 col-lg-6">
                  <div className="feature__area-image" data-aos="fade-right">

                    <img src={BASE_URL + packageData?.hotelId?.image} alt="" />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="feature__area-left" data-aos="fade-left">
                    <div className="feature__area-left-title">
                      <span className="subtitle__one">Our Place</span>
                      <h2 className="fs-1">{packageData?.hotelId?.name}</h2>
                      <p>
                        {packageData?.hotelId?.description}
                      </p>

                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center bg-right mb-60 flex justify-between">
                <div className="col-xl-6 col-lg-6  order-last order-lg-first">
                  <div className="feature__area-left" data-aos="fade-right">
                    <div className="feature__area-left-title">
                      <span className="subtitle__one">Our Stay</span>
                      <h2 className="fs-1">{packageData?.roomId?.name}</h2>
                      <p>
                        {packageData?.roomId?.description}
                      </p>

                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="feature__area-image" data-aos="fade-left" >

                    <img src={BASE_URL + packageData?.roomId?.image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container package_detail  " id="detail">
            <div className="package_detail_left">
              <hr className="mb-5 mt-5" />
              <section className="booking-detail">
                <div className="detail ">
                  <div className="detail-left"><h6>Price Includes</h6></div>
                  <div className="detail-right">
                    <div className="sub-detail-right">
                      <i className="fa-solid fa-check"></i> <p>Air Fares</p>
                    </div>
                    <div className="sub-detail-right">
                      <i className="fa-solid fa-check"></i> <p>3 Nights Hotel Accomodation</p>
                    </div>
                    <div className="sub-detail-right">
                      <i className="fa-solid fa-check"></i> <p>Tour Guide</p>
                    </div>
                    <div className="sub-detail-right">
                      <i className="fa-solid fa-check"></i> <p>2 Meals/Day</p>
                    </div>

                  </div>
                </div>

              </section>
              <hr className="mt-5 mb-5" />
              <section className="booking-detail wow fadeInUp" data-wow-delay="0.1s">
                <div className="detail ">
                  <div className="detail-left"><h6>Complementaries</h6></div>
                  <div className="detail-right">
                    <div className="sub-detail-right">
                      <i className="fa-solid fa-check"></i> <p>Umbrella</p>
                    </div>
                    <div className="sub-detail-right">
                      <i className="fa-solid fa-check"></i><p>Sunscreen</p>
                    </div>

                  </div>
                </div>
              </section>


            </div>
            <div className="package_detail_right">

              <div className="card booking-card bg-light" >
                <div className="card-body why-us-card">
                  <h6 className="pt-3 mb-3 ms-2">Why Book With Us</h6>
                  <div className="why-book-us">
                    <i className="fa-solid fa-indian-rupee-sign ms-2"></i> <p>No-hassle best price guarantee</p>
                  </div>
                  <hr />
                  <div className="why-book-us">
                    <i className="fa-solid fa-indian-rupee-sign ms-2"></i><p>Customer care available 24/7</p>
                  </div>
                  <hr />
                  <div className="why-book-us">
                    <i className="fa-solid fa-star ms-2"></i><p>Hand-picked Tours & Activities</p>
                  </div>
                  <hr />
                  <div className="why-book-us">
                    <i className="fa-regular fa-futbol ms-2"></i><p>More Activities</p>
                  </div>
                  <hr />


                </div>
              </div>
            </div>
          </div>
          {/* ----reviews----------------------------------------------------- */}
          <div className="container wow fadeInUp" data-wow-delay="0.1s">
            <div className="text-center">
              <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
              <h1 className="mb-5">Our Clients Say!!!</h1>
            </div>
            <section className="testimonial text-center">
              <div className="container">

                <div
                  id="testimonial4"
                  className="carousel slide testimonial4_indicators testimonial4_control_button thumb_scroll_x swipe_x"
                  data-ride="carousel"
                  data-pause="hover"
                  data-interval={4000}
                  data-duration={1000}
                >
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                      <div className="testimonial4_slide bg-transparent" style={{ fontSize: "50px" }}>
                        Our Satisfied <br /> Customers
                      </div>
                    </div>
                    {review?.map((el, index) => (
                      <Fragment key={index}>
                        <div className="carousel-item">
                          <div className="testimonial4_slide">

                            <p className='text-dark'>
                              {el.review}.{" "}
                            </p>
                            <h4 className='text-dark'>{el?.packageId?.name}</h4>
                            <h4 className='text-warning' style={{ fontSize: "25px" }}>{Stars(el.rating)}</h4>
                          </div>
                        </div>
                      </Fragment>
                    ))}

                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#testimonial4"
                    data-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" />
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#testimonial4"
                    data-slide="next"
                  >
                    <span className="carousel-control-next-icon" />
                  </a>
                </div>
              </div>
            </section>


          </div>

          {/* ----/reviews----------- */}


          {/* ------/FAQ */}

          <>

            <section className="faq-page mt-5  wow fadeInUp" data-wow-delay="0.1s">
              <div className="text-center">
                <h6 className="section-title bg-white text-center text-primary px-3">FAQ</h6>
                <h1 className="mb-5">How Can I Help You</h1>
              </div>
              <div className="container">
                <div className="row ">
                  <div className="col-lg-4 faq_left" style={{ height: "auto" }}>
                    <div className="faq-page__contact">
                      <img src="/assets/img/faqq.jpg" alt="..." />
                      <h3 className="faq-page__contact__title">
                        Have Questions? <br />
                        Call Now!
                      </h3>
                      {/* /.faq-page__contact__title */}
                      <div className="faq-page__contact__text">
                        <i className="fa-solid fa-phone text-white"></i>
                        <p className="faq-page__contact__number">
                          Have Question?
                          <br />
                          Free <a href="tel:+91-77106-37XXX"> +91 77106-37XXX</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ------FAQ */}
                  <div className="col-lg-8 faq_right" style={{ height: "auto" }}>

                    <div className="faq_area section_padding_130 wow fadeInUp" data-wow-delay="0.1s" id="Faq" >
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-12 col-sm-8 col-lg-6">
                            {/* Section Heading*/}
                            <div
                              className="section_heading text-center wow fadeInUp"
                              data-wow-delay="0.2s"
                              style={{
                                visibility: "visible",
                                animationDelay: "0.2s",
                                animationName: "fadeInUp"
                              }}
                            >


                              <div className="line" />
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          {/* FAQ Area*/}

                          <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                >
                                  How can i book the package?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  you can just go into the packages and click on the BOOK NOW button after that all the details will appear regarding that package and the you can click on PROCEED BOOKING.
                                </div>
                              </div>
                            </div>

                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseTwo"
                                >
                                  How can i view my bookings/history?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseTwo"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  For this just click on the info on the header and go to booking, here you can veiw all the booking history.
                                </div>
                              </div>
                            </div>

                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseThree"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseThree"
                                >
                                  How can i change the Password?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseThree"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  To change the password just go to the user icon in my profile section chnage the password.
                                </div>
                              </div>
                            </div>

                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseThree"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseThree"
                                >
                                  How can i cancel my booking?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseFour"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  To cancel the booking you can freely contact us.
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseFour"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseFour"
                                >
                                  How do I know if my booking is confirmed?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseFive"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  After completing your booking you can check the status of your booking on our website under "Booking."
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseFive"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseFive"
                                >
                                  What payment methods do you accept?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseSix"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  We accept various payment methods including credit/debit cards, UPI, and bank transfers.You have to pay when you vist to the Hotel. Specific options will be available during the checkout process.
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseSix"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseSix"
                                >
                                  How can i view my bookings/history?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseSeven"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  For this just click on the info on the header and go to booking, here you can veiw all the booking history.
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseSeven"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseSeven"
                                >
                                  How can i view my bookings/history?
                                </button>
                              </h2>
                              <div
                                id="flush-collapseEight"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div className="accordion-body">
                                  For this just click on the info on the header and go to booking, here you can veiw all the booking history.
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                  {/* /.col-lg-8 col-xl-9 */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container */}
            </section>
            {/* /.faq-page-accordion */}
          </>

        </>)}
    </Fragment>
  )
}