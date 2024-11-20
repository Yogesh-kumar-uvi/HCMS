import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { showLoading, hideLoading } from '../../Redux/AlertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { message } from 'antd'
import '../Home/Home.css'

const Appointments = () => {
  const navigate = useNavigate();
  const [show, setShow]= useState(false);
  const {user} = useSelector(state => state.user)
  const [doctdetail,setDoctdetail] = useState({});
  const openConversation =(doctor) =>{
    setDoctdetail(doctor);
    console.log(doctdetail);
    setShow(true);
  }
  const handleClose = () => setShow(false);
  const formData = {
    userID:user,
  }
  // dispatch(showLoading());
  const getAppointment = async()=>{
      // dispatch(showLoading())
      if(formData.userID){
        const res = await axios.get(`http://localhost:8080/user/api/v1/getAllAppointments/${formData.userID.id}`);
        if(res.data.success){
          if(res.data.data){
            setDocto(res.data.data.reverse())
            console.log(res.data.data);
          }
        }
        else{
          message.error("Error in Finding Data");
        }
      }else{
        navigate("/")
      }

      // dispatch(hideLoading())
  }
  const [docto,setDocto] = useState([]);
  const [doctor,setDoctor] = useState([]);
  // getAppointment();
  useEffect(()=>getAppointment,[])
  return (
    <>
          <div className='search-doctor container'>
        <form className="row g-3">
        <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
            Password
            </label>
            <input
            type="text"
            className="form-control"
            id="inputPassword2"
            placeholder="Doctor Name"
            />
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
                Search Doctor
            </button>
        </div>
        </form>
      </div>
            {/* Doctor List */}
            <div className='doctorList container pt-5'>
      <div>
        {docto ? ( docto.map((doctor) => (<>
          <div>
                  <div className='doctorList-1'  key={doctor.id}>
                  <div className='doctorList-1-left'>
                    <div className='doctorList-1-left-img'>
                      <img src="https://www.healthcare-management-degree.net/wp-content/uploads/2016/09/cropped-healthcare-mgmt512.png" />
                    </div>
                    <div className='doctorList-1-left-book-appointment'  onClick={()=>openConversation(doctor)}>
                      Appointment Details
                    </div>
                  </div>
                  <div className='doctorList-1-right'>
                    <div className='doctorList-1-right-heading'>
                    {doctor.doctor.name}
                    </div>
                    <div className='doctorList-1-right-speciality'>
                    {doctor.doctor.specialization}
                    </div>
                    <div className='doctorList-1-right-experience'>
                      <div  className='heading-doctor'>
                        Experience : &nbsp;
                      </div>
                      <div  className='answer-doctor'>
                      {doctor.doctor.experience}
                      </div>
                    </div>
                    <div className='doctorList-1-right-fees'>
                    <div  className='heading-doctor'>
                        Fees :&nbsp;
                      </div>
                      <div  className='answer-doctor'>
                      {doctor.doctor.fees}
                      </div>
                    </div>
                    <div className='doctorList-1-right-available-time'>
                    <div  className='heading-doctor'>
                        Available Timings :&nbsp;
                      </div>
                      <div  className='answer-doctor'>
                      {doctor.doctor.availableTimings.day1} : {doctor.doctor.availableTimings.time1} <br /> {doctor.doctor.availableTimings.day2} : {doctor.doctor.availableTimings.time2}
                      </div>
                    </div>
                  </div>
                </div>



        </div>
        



</>
        ))):
         <h1> No Appointments</h1>
        }
    </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{marginLeft:"auto",marginRight:"auto"}}>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table  className='border border-success rounded-bottom ms-5' >
          <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Patient Name :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
                {Object.keys(user).length>0 ? user.name : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Doctor Name :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              {Object.keys(doctdetail).length>0 ? doctdetail.doctor.name : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Phone No. :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              +91 - {Object.keys(doctdetail).length>0 ? doctdetail.doctor.phone : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Specialization :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              {Object.keys(doctdetail).length>0 ? doctdetail.doctor.specialization : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Experience :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              {Object.keys(doctdetail).length>0 ? doctdetail.doctor.experience : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Fees :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              {Object.keys(doctdetail).length>0 ? doctdetail.doctor.fees : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Date of apply :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              {Object.keys(doctdetail).length>0 ? doctdetail.day.substring(0,10) : "Null"}
              </td>
            </tr>

            <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Status of Application :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
              {Object.keys(doctdetail).length>0 ? doctdetail.status : "Null"}
              </td>
            </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{
            handleClose();
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Appointments