import React, { useEffect, useState } from 'react'
import ApiServices from '../Services/ApiServices';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddReview() {
    const [feedbackDescription, setFeedbackDescription] = useState()
    const [rating, setRating] = useState()
    const [starArray, setStarArray] = useState([false, false, false, false, false])
  
  
    const navigate = useNavigate()
    const param = useParams()
    const id = param.id

    const noteRating = (count) => {
        let arr=[]
        for(let i = 0; i < 5; i++){
          if(i<count) arr.push(true)
          else arr.push(false)
        }
        setStarArray(arr)
        setRating(count)
      }
    
    
      const save = (e) => {
        e.preventDefault()
        let data = {
          userId:sessionStorage.getItem('userId'),
          packageId: id,
          rating: rating,
          review: feedbackDescription
        }
    
        ApiServices.addRating(data).then(
          (data) => {
            // console.log(data.data.data.name)
            if (data.data.success) {
              toast.success(data.data.message)
              navigate('/showuserbooking')
              setFeedbackDescription("")
              setRating([false, false, false, false, false])
            }
            else {
              toast.error(data.data.message)
              navigate('/showuserbooking')
            }
          }
        ).catch(
          (error) => {
            toast.error(error)
          }
        )
      }

  return (
   <>
                 <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white animated slideInDown">Booking</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="#">Pages</a>
                                    </li>
                                    <li
                                        className="breadcrumb-item text-white active"
                                        aria-current="page"
                                    >
                                        Booking
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5">
        <div className="container-fluid">
          <div className="row g-12">
            <div className="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <form>
                <div className="row g-2">

                  <div className="col-sm-12">
                    <div className="form-floating">
                      <h2>Rate Us</h2>
                      {starArray?.map((data, i) => (
                         <span>
                          { data ? 
                          <i class="bi bi-star-fill text-warning"  onClick={()=>{
                            noteRating(i+1)
                          }}></i>
                          :
                          <i class="bi bi-star"  onClick={()=>{
                            noteRating(i+1)
                          }}></i>
                        }
                         </span>

                      ))}
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-floating">
                      <input required
                        type="text"
                        className="form-control border-0 bg-light"
                        id="gname"
                        placeholder="Gurdian Name" value={feedbackDescription} onChange={(e) => {
                          setFeedbackDescription(e.target.value)
                        }}
                      />
                      <label htmlFor="gname">&nbsp;&nbsp;Feedback Description</label>
                    </div>
                  </div>



                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit" onClick={save}>
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

   </>
  )
}

export default AddReview