import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import React, { Fragment, useEffect, useState, } from 'react';
import ApiServices from "../Services/ApiServices"

export default function UpdateHotel() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    
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
        ApiServices.singleRoom(data).then((res) => {
            console.log(res.data.data);
            setName(res.data.data.name)
            setPrice(res.data.data.price)
            setDescription(res.data.data.description)
           
        })
    },[])

    const nav = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("_id", id)
        data.append("name", name) 
        data.append("price", price)
        data.append("description", description)

        if (!!imageName) {
            data.append("image", image)
        }
        ApiServices.updateroom(data)
        .then((res) => {
            if (res.data.success == true) {
                toast.success(res.data.message)
                nav("/hotel/manageroom")
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
                    <h2>Update Room</h2>
                    <div className="inputs">
                        <div className="col-md-12">
                        <label className='destination-label' htmlFor="">Name<span className="text-danger">*</span></label><br />
                        <input className='input-data' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <br />
                     
                        <div className="row">
                        <div className="col-md-6">
                        <label className='destination-label' htmlFor="">Price<span className="text-danger">*</span></label><br />
                        <input className='input-data' type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        </div><br />
                        <div className="col-md-6">
                        <label className='destination-label' htmlFor="">Description<span className="text-danger">*</span></label><br />
                        <textarea className='input-data' type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        </div><br />
                      <div className="col-md-12">
                        <div className="input-group custom-file-button ">
                            
                            <input type="file" className="form-control image-input mb-5" id="inputGroupFile" value={imageName} onChange={(e) => { setImageName(e.target.value); setImage(e.target.files[0]) }} />
                        </div>
                        </div>
                        <br />
                        <button>Update Room</button>
                    </div>
                    <br />


                </form>

            </section>

        </Fragment>

    )

}


