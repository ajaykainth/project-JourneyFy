import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from "../Services/ApiServices"

export default function UpdateHotel() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [description, setDescription] = useState("")
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
        ApiServices.singleHotel(data)
        .then((res) => {
            console.log(res.data.data);
            setName(res.data.data.name)
            setAddress(res.data.data.address)
            setContact(res.data.data.contact)
            setDescription(res.data.data.description)
          
        })
    },[])

    const nav = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()
        let UpdateData = new FormData()
        UpdateData.append("_id", id)
        UpdateData.append("name", name)
        UpdateData.append("address", address)
        UpdateData.append("contact", contact)
        UpdateData.append("description", description)
        if (!!imageName) {
            UpdateData.append("image", image)
        }   
        ApiServices.Updatehotel(UpdateData)
        .then((res) => {
            if (res.data.success == true) {
                toast.success(res.data.message)
                nav("/admin/managehotel")
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
                    <h2>Update Destination</h2>
                    <div className="inputs">
                        <div className="col-md-12">
                        <label className='destination-label' htmlFor="">Name*</label><br />
                        <input className='input-data' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <br />
                        <div className="col-md-12">
                        <label className='destination-label' htmlFor="">Address*</label><br />
                        <input className='input-data' type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        </div><br />
                        <div className="row">
                        <div className="col-md-6 col-xl-6">
                        <label className='destination-label' htmlFor="">Contact*</label><br />
                        <input className='input-data' type="text" value={contact} onChange={(e) => { setContact(e.target.value) }} />
                        </div>
                   
                        <div className="col-md-6 ">
                        <label className='destination-label' htmlFor="">description*</label><br />
                        <textarea className='input-data' type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <br />
                        </div>
                        <div className="col-md-12">
                        <div className="input-group custom-file-button ">
                            
                            <input type="file" className="form-control image-input mb-5" id="inputGroupFile" value={imageName} onChange={(e) => { setImageName(e.target.value); setImage(e.target.files[0]) }} />
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


