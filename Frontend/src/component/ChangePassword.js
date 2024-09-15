import { Fragment, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import ApiServices from "../Services/ApiServices"

export default function ChangePassword() {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId") || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate()
    const handleForm = (e) => {
        e.preventDefault()
        let data = {
            _id: userId,
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        ApiServices.changePassword(data)
            .then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message)

                   navigate("/login")

                   
                   
                } else if (res.data.success == false) {
                    toast.error(res.data.message)
                }
            }).catch((err) => {
                toast.warn(err)
            })
    }

    return (
        <Fragment>
            <ToastContainer/>
            <div className=" login-form-container">

                {/* ////////////////////////////////////////////////////////////////////// */}
                <div className="form-right-box">
                    <form className="login-form" action="" onSubmit={handleForm}>
                        <h2>Change your account Password</h2>
                        <div className="input1"> <label htmlFor="login">Current Password</label>
                            <input type="password" value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} /></div>

                        <div className="input2"> <label htmlFor="login">New Password</label>
                            <input type="Password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} /></div>
                    
                        <button>Change Password</button>



                    </form>
                </div>

                
            </div>

            
        </Fragment>
    )
}