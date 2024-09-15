import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import React, { Fragment, useState, } from 'react';
import ApiServices from '../Services/ApiServices';

export default function AddDestination() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [imageName, setImageName] = useState("")
    const [image, setImage] = useState({})

    const changeImage = (e) => {
        setImageName(e.target.value);
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    }
    const handleForm = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("name", name)
        data.append("address", address)
        data.append("image", image)

       ApiServices.adddestination(data)
            .then((res) => {
                if (res.data.success == true) {
                    // console.log(res);
                    toast.success(res.data.message)
                    setName("")
                    setAddress("")
                    setImageName("")
                    setImage({})
                }
                // else if (res.data.success === false) {
                //     console.log(res)
                // }
                else {
                    toast.error(res.data.message)
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
            <section className='form-section'>
                <form className='destination-form' action="" onSubmit={handleForm}>
                    <h2>Add Destination</h2>
                    <div className="inputs">
                        <label className='destination-label' htmlFor="">Name*</label><br />
                        <input className='input-data' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <br />
                        <label className='destination-label' htmlFor="">Address*</label><br />
                        <input className='input-data' type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} /><br />
                        <div className="input-group custom-file-button ">
                           
                            <input type="file" className="form-control image-input " id="inputGroupFile" value={imageName} onChange={changeImage} />
                        </div>
                        <br />
                        <button>Add Destination</button>
                    </div>
                    <br />


                </form>

            </section>

        </Fragment>

    )

}


