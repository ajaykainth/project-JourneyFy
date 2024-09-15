import { Fragment, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import ApiServices from "../Services/ApiServices"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const handleForm = (e) => {
        e.preventDefault()
        let data = {
            email: email,
            password: password
        }
        ApiServices.login(data)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success(res.data.message)

                    sessionStorage.setItem("userId", res.data.data._id)
                    sessionStorage.setItem("token", res.data.token)

                    if (res.data.data.userType == 1) {
                        navigate("/admin")  
                    }
                    else if (res.data.data.userType == 2) {
                        ApiServices.AllHotel({userId:sessionStorage.getItem("userId")})
                        .then((res)=>{
                            sessionStorage.setItem("hotelId",res.data.data[0]._id)
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                        

                        // console.log("hotelId",res.data.data._id);
                        navigate("/hotel")
                    }
                    else if (res.data.data.userType == 3) {
                        navigate("/")
                    }
                } else if(res.data.success==false){
                    toast.error(res.data.message)
                }
            }).catch((err) => {
                toast.warn(err)
            })
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className=" login-form-container">
                <div className="form-left-box">
                    <div className="left-box-heading">
                        <h1>Journeyfy</h1>
                        <h4>Welcome Back</h4>
                        <p>Adventure is out there, waiting for you to find it</p>
                    </div>
                    <div className="left-box-img">
                        <img src="assets/img/Traveling-pana.png" alt="" />
                    </div>

                </div>
                {/* ////////////////////////////////////////////////////////////////////// */}
                <div className="form-right-box">
                    <form className="login-form" action="" onSubmit={handleForm}>
                        <h2>Sign in your account</h2>
                        <div className="input1"> <label htmlFor="login">Email</label>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>

                        <div className="input2 mb-4"> <label htmlFor="login">Password</label>
                            <input type="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /></div>
                  
                        <button>Sign in</button>

                        <div className="form-signup-link d-flex ">
                            <p>Don't have an account? <Link to={"/register"} ><span>Sign up</span></Link> </p>
                            {/* <Link to={"/changePassword"} className="text-danger">Change Password</Link> */}
                         
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}