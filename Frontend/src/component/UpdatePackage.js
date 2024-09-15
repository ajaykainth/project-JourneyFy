import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from "../Services/ApiServices"

export default function UpdateHotel() {
    const [name, setName] = useState("")
    const [duration, setDuration] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    let params = useParams()
    console.log(params.id);
    const id = params.id
    useEffect(() => {
        window.scroll(0,0)
        let packageData = {
            _id: id
        }
        ApiServices.singlePackage(packageData)
            .then((res) => {
                console.log(res.data.data);
                setName(res.data.data.name)
                setDuration(res.data.data.duration)
                setDescription(res.data.data.description)
                setPrice(res.data.data.price)

            })
    }, [])

    const nav = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()
        const data = {
            _id: id,
            name: name,
            duration: duration,
            description: description,
            price: price

        }

        ApiServices.updatepackage(data)
            .then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message)
                    nav("/admin/managepackage")
                } else {
                    toast.error(res.data.message)
                }
            })
    }

    return (
        <Fragment>
            <ToastContainer />
            <section className='form-section'>
                <form className='destination-form' action="" onSubmit={handleForm}>
                    <h2>Update Package</h2>
                    <div className="inputs">
                        <div className="col-md-12">
                            <label className='destination-label' htmlFor="">Name*</label><br />
                            <input className='input-data' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-12">
                            <label className='destination-label' htmlFor="">Duration*</label><br />
                            <input className='input-data' type="text" value={duration} onChange={(e) => { setDuration(e.target.value) }} />
                        </div><br />
                        <div className="row">
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Price*</label><br />
                            <input className='input-data' type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className='destination-label' htmlFor="">Description*</label><br />
                            <textarea className='input-data' type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                       
                        
                        </div>
                        <br />
                        <button>Update Destination</button>
                    </div>
                    <br />


                </form>

            </section>

        </Fragment>

    )

}


