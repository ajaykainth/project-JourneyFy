import { ToastContainer, toast } from "react-toastify";
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from '../Services/ApiServices';
import FadeLoader from 'react-spinners/FadeLoader';

export default function AddRoom() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("₹")
    const [description, setDescription] = useState("")
    const [imageName, setImageName] = useState("")
    const [image, setImage] = useState({})
    const [allhotel, setAllHotel] = useState([])
    const hotelId = sessionStorage.getItem("hotelId");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        window.scroll(0,0)
        console.log("Hotel ID from session storage:", hotelId);
    }, [hotelId]);
    useEffect(() => {
        ApiServices.allhotel()
            .then((res) => {
                if (res.data.success) {
                    console.log(res);
                    setAllHotel(res.data.data)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000)
                }
                else {
                    toast.error(res.data.message)
                    setLoading(false)
                    
                }
            })
            .catch()
    }, [])

    const changeImage = (e) => {
        setImageName(e.target.value);
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    }
    const handleForm = (e) => {
        e.preventDefault()
        setLoading(false);

        const data = new FormData()
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("hotelId", hotelId)
        data.append("image", image)

        ApiServices.addroom(data)
            .then((resp) => {
                if (resp.data.success == true) {
                    sessionStorage.getItem("hotelId")
                    toast.success(resp.data.message)
                    setLoading(false)
                    setName("")
                    setPrice("₹")
                    setDescription("")
                    setImageName("")
                    setImage({})

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
                <section className='form-section-room'>
                    <form className='destination-form' onSubmit={handleForm}>
                        <h2>Add Room</h2>
                        
                        <div className="inputs">
                            <div className="col-md-12">
                            <label className='destination-label'>Name<span className="text-danger">*</span></label><br />
                            <input className='input-data' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <br />
                            <div className="col-md-12">
                            <div className="price-hotel">
                                <label className='destination-label'>Price<span className="text-danger">*</span></label><br />
                                <input className='input-data' type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
                            </div>
                            </div>
                            <div className="price-hotel">
                                <label className='destination-label'>Description <span className="text-danger">*</span></label><br />
                                <textarea className='input-data' type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                            </div>
                            <div className="col-md-12">
                            <div className='image-input'>
                                <input className="form-control form-control-lg input-image" id="formFileLg" type="file" value={imageName} onChange={changeImage} />
                            </div>
                            </div><br />
                            <button>Add Room</button>
                        </div>
                    
                    </form>
                </section>
            )}
        </Fragment>

    )

}


