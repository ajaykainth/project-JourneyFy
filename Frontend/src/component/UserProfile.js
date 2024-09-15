import React, { Fragment, useEffect, useState } from "react";
import ApiServices from "../Services/ApiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
export default function UserProfile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [gender, setGender] = useState("")
    // const [gender, setGender] = useState("")
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        getCustomerData();
    }, []);

    const getCustomerData = () => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            toast.error("User ID not found in session storage");
            return;
        }

        const data = { userId: userId };
        console.log(data);

        ApiServices.singleCustomer(data)
            .then((res) => {
               
                if (res.data.success) {
                    setCustomerData(res.data.data);
                    // console.log(customerData);

                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("An error occurred ");
            });
    };

    // --------MODAL----------
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setName(customerData.name);
        setContact(customerData.contact);
        setAddress(customerData.address);
        setGender(customerData.gender);
        setIsOpen(true);


    }
    function closeModal() {
        setIsOpen(false);
    }

    // ----Update Profile---
    const handleSaveChanges = () => {
        const data = {
            _id: sessionStorage.getItem("userId"),
            name: name,
            email: email,
            contact: contact,
            address: address,
            gender: gender
        }
        ApiServices.updateProfile(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success("Profile updated successfully");
                    getCustomerData();
                    closeModal();
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("An error occurred while updating the profile");
            });
    }
    return (
        <Fragment>
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">

                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white animated slideInDown">Profile</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">
                                        Profile
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile Start */}
            <div className="container">

                <div className="row  ps-5 pe-5">
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img
                                        src="/assets/img/user.png"
                                        alt="Admin"
                                        className="rounded-circle"
                                        width={150}
                                    />
                                    <div className="mt-3">
                                        <h4>{customerData.name || "Customer Name"}</h4>

                                        <p className="text-muted font-size-sm">
                                            {customerData.address || "Customer Address"}
                                        </p>
                                        <button className="btn btn-primary " onClick={openModal}>Edit Profile</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 edit-profile-label">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-dark">{customerData?.name}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 edit-profile-label">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-dark">{customerData?.email}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 edit-profile-label">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-dark"><strong>+91</strong> {customerData?.contact}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 edit-profile-label">Gender</h6>
                                    </div>
                                    <div className="col-sm-9 text-dark ">{customerData?.gender}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 edit-profile-label">Status </h6>
                                    </div>
                                    <div className="col-sm-9">
                                     <strong> <span className={customerData?.status===true?"text-success ":"text-danger"}>{customerData?.userId?.status === true ? "Active" : "In-Active"}</span> </strong> 
                                    </div>
                                </div>
                                <hr />

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Profile End */}

            {/* ----Edit Profile Start------- */}
            <div>

                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    className="Profile-Modal"
                    overlayClassName="Profile-Overlay"

                    contentLabel="Example Modal"
                >

                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">

                            <div className="col-lg-8">
                                <div className="card">
                                    
                                    <div className="card-header text-center text-primary edit-profile-font">
                                        Edit Profile
                                        
                                    </div>
                                    <div className="card-body p-5">
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    value={name} onChange={(e) => { setName(e.target.value) }}
                                                    className="form-control"
                                                    defaultValue="John Doe"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    value={email} onChange={(e) => { setEmail(e.target.value) }}
                                                    className="form-control"
                                                    placeholder={customerData.email}
                                                    // defaultValue="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    value={contact} onChange={(e) => { setContact(e.target.value) }}
                                                    className="form-control"
                                                    defaultValue="(239) 816-9029"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Gender</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <select
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="form-control"
                                                >
                                                   
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    value={address} onChange={(e) => { setAddress(e.target.value) }}
                                                    className="form-control"
                                                    defaultValue="Bay Area, San Francisco, CA"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3" />
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    onClick={handleSaveChanges}
                                                    type="button"
                                                    className="btn btn-primary px-4 me-4 mb-3"
                                                    defaultValue="Save Changes"
                                                />
                                                <button className="btn btn-secondary mb-3" onClick={closeModal}>close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </Modal>
            </div>

            {/* ----/Edit Profile Start------- */}

        </Fragment>
    );
}
