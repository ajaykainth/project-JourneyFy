import { Fragment } from "react";
import { Link } from "react-router-dom";
export default function Faq() {
    window.scroll(0,0)
    return (
        <Fragment>
             <div className="container-fluid bg-primary py-5 mb-5 hero-header h-75">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">FAQ</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    FAQ
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

            <section className="faq-page  wow fadeInUp" data-wow-delay="0.1s">
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

                            <div className="faq_area section_padding_130 wow fadeInUp" data-wow-delay="0.1s" id="Faq" style={{ height: "70vh" }}>
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

        </Fragment>
    )
}