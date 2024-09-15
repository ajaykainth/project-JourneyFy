import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from "../Services/ApiServices"

export default function UpdateDestination() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [imageName, setImageName] = useState("")
    const [image, setImage] = useState({})

    let params = useParams()
    console.log(params.id);
    const id = params.id

    useEffect(() => {
        window.scroll(0,0)
        let data = {
            _id: id
        }
        ApiServices.SingleDestination(data).then((res) => {
            console.log(res.data.data);
            setName(res.data.data.name)
            setAddress(res.data.data.address)

        })
    }, [])
    const nav = useNavigate()
    const handleForm = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("_id", id)
        data.append("name", name)
        data.append("address", address)
        if (!!imageName) {
            data.append("image", image)
        }
        ApiServices.updatedestination(data)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success("data updated")
                    nav("/admin/managedestination")
                } else {
                    toast.error(res.data.message)
                }
            })
    }

    return (
        <Fragment>
            <ToastContainer/>
            <section className='form-section'>
                <form className='destination-form' action="" onSubmit={handleForm}>
                    <h2>Update Destination</h2>
                    <div className="inputs">
                        <label className='destination-label' htmlFor="">Name*</label><br />
                        <input className='input-data' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <br />
                        <label className='destination-label' htmlFor="">Address*</label><br />
                        <input className='input-data' type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} /><br />
                        <div className="input-group custom-file-button ">

                            <input type="file" className="form-control image-input mb-5" id="inputGroupFile" value={imageName} onChange={(e) => { setImageName(e.target.value); setImage(e.target.files[0]) }} />
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


