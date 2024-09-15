import { Fragment } from "react";

export default function BookingModal() {
    return (
        <Fragment>
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
                                    <p className="mb-4">
                                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                        diam amet diam et eos. Clita erat ipsum et lorem et sit.
                                    </p>


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
                                                        className="form-control bg-transparent"
                                                        id="email"
                                                        value={guestCount} onChange={(e) => { setGuestCount(e.target.value) }}
                                                        placeholder="guest"
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
                                                        value={bookingDate} onChange={(e) => { setBookingDate(e.target.value) }}
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
            
        </Fragment>
    )
}