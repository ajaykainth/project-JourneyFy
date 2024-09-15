import { ToastContainer,toast } from "react-toastify";
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from '../Services/ApiServices';
import ReactSelect from "./ReactSelect";

export default function AddHotel() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("")
    const [image, setImage] = useState({})
    const [alldestination, setAllDestination] = useState([])
    const [destinationId, setDestinationId] = useState("")
    useEffect(() => {
        // let data = {
        //     status:true
        // }
        window.scroll(0,0)
        ApiServices.alldestination()
            .then((res) => {
                if (res.data.success) {
                    setAllDestination(res.data.data)
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [destinationId])


    const changeImage = (e) => {
        setImageName(e.target.value);
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    }

    const handleForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("name", name)
        data.append("email", email)
        data.append("password", password)
        data.append("contact", contact)
        data.append("address", address)
        data.append("description", description)
        data.append("destinationId", destinationId)
        data.append("image", image)

        ApiServices.addhotel(data)
            .then((resp) => {
                if (resp.data.success === true) {
                    toast.success(resp.data.message)

                    setName("")
                    setEmail("")
                    setPassword("")
                    setContact("")
                    setAddress("")
                    setDescription("")
                    setImageName("")
                    setImage({})
                    setDestinationId("")

                } else {
                    toast.error(resp.data.message)
                }
            })
            .catch((err) => {
                toast.error("Something went Wrong! Try again later")
                console.log(err);
            })
    }

    return (
        <Fragment>
            <ToastContainer/>
            <section className='form-section-hotel'>
                <form className='destination-form' action="" onSubmit={handleForm}>
                    <h2>Hotel Register</h2>
                    <div className="row inputs">
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Name <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="text" value={name} onChange={(e) => { setName(e.target.value) }} /></div>

                        <br />

                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Email <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Password <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Contact <span className="text-danger">*</span></label><br />
                            <input className='input-data w-100' type="number" value={contact} onChange={(e) => { setContact(e.target.value) }} />

                        </div>
                        <br />
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Address <span className="text-danger">*</span></label><br />
                            <input className='input-data  w-100' type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">description <span className="text-danger">*</span></label><br />
                            <textarea className='input-data  w-100' type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-6">
                            <select value={destinationId} className="form-select add-room-select w-100" aria-label="Default select example" onChange={(e) => { setDestinationId(e.target.value) }}>
                                <option disabled value={""}>Choose Destination</option>
                                {alldestination?.map((el, index) => (
                                    <Fragment key={index}>

                                        <option value={el?._id}>{el?.name}----{el.address}</option>
                                    </Fragment>
                                ))}
                            </select>
                            {/* <ReactSelect/> */}
                        </div>
                        <br />



                        <div className="col-md-6 ">
                            <div className='image-input w-100'>
                                <input className="form-control form-control-lg input-image w-100" id="formFileLg" type="file" value={imageName} onChange={changeImage} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="col-md-12">
                    <button>Add Hotel</button>

                    </div>
                    




                </form>

            </section>
        </Fragment >
    )
}