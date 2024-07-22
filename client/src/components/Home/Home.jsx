import React, { useEffect, useState } from 'react'
import { add } from '../../Redux/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../../Redux/AlertSlice'
import axios from 'axios'
import { message } from 'antd'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [doctdetail, setDoctdetail] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  
  const {user} = useSelector(state => state.user)
  const items = useSelector((state)=>state.token)
  let rr= "";
  if(items.length!==0){
  console.log(items[0].data.message);
  rr = items[0].data.message;
  }
  const dataGetter = async()=>{
    try {
      const resp = await axios.get("http://localhost:8080/user/api/v1/getAllDoctors")
      if(resp.data.success){
        setDoctor(resp.data.data)
      }
    } catch (error) {
      message.error(error)
    }
  }
  const [doctor,setDoctor] = useState([]);
  useEffect(()=>{
    dataGetter()
  },[])

  const handleAdd = (item)=>{
    console.log(item);
    setDoctdetail(item);
    handleShow();
  }
  const createAppointment = async(item)=>{
    const time = `${item.availableTimings.day1} ${item.availableTimings.time1}  ${item.availableTimings.day2} ${item.availableTimings.time2}`
    const appointmentData = {
      userID:user.id,
      doctorID:item._id,
      timing:time
    }
    try {
      const resp = await axios.post("http://localhost:8080/appointment/api/v1/",appointmentData)
      if(resp.data.success){
        message.success(resp.data.message)
        navigate("Appointments")
      }
    } catch (error) {
      message.error(error)
    }
  }


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, []);


const openRazorpay = async (doctdetail) => {

    const userData = {
        userId: user.id,
        doctorId:doctdetail._id,
        amount:doctdetail.fees
    }
    const order = await axios.post('http://localhost:8080/appointment/api/v1/create-order', userData);
    console.log(order);
    if (!order.data.success) {
        alert("Order failed!");
        return;
    }
    const options = {
        key: order.data.data.razorpayKeyId,
        amount: doctdetail.fees*100,
        currency: 'INR',
        name: 'HealthCare Management',
        description: 'Test Transaction',
        image: 'https://www.healthcare-management-degree.net/wp-content/uploads/2016/09/cropped-healthcare-mgmt512.png',
        order_id: order.data.data.id,
        handler:async function (response) {
            const userData = {
                razorpay_payment_id :response.razorpay_payment_id, 
                razorpay_order_id:response.razorpay_order_id, 
                razorpay_signature:response.razorpay_signature 
            }
            const orderResult = await axios.post('http://localhost:8080/appointment/api/v1/verify-order', userData);
            if(orderResult.data.success){
                
              createAppointment(doctdetail);
            }
        },
        prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
        },
        notes: {
            address: 'SRIMT Lucknow',
        },
        theme: {
            color: '#3399cc',
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        message.error('Payment Failed');
    });
    rzp1.open();
};


  return (
    <>
          <div className='search-doctor container'>
        <form className="row g-3 text-primary pt-3 pe-3">
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
            <div className='doctorList  pt-1'>
      <div>

        {doctor.map((doctor) => (
          <div>
                  <div className='doctorList-1'  key={doctor.id}>
                  <div className='doctorList-1-left'>
                    <div className='doctorList-1-left-img'>
                      <img src="https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-doctor-icon-circle-png-image_2055257.jpg" />
                    </div>
                    <div className='doctorList-1-left-book-appointment' onClick={()=>handleAdd(doctor)}>
                      Book Appointment
                    </div>
                  </div>
                  <div className='doctorList-1-right'>
                    <div className='doctorList-1-right-heading'>
                    {doctor.name}
                    </div>
                    <div className='doctorList-1-right-speciality'>
                    {doctor.specialization}
                    </div>
                    <div className='doctorList-1-right-experience'>
                      <div  className='heading-doctor'>
                        Experience : &nbsp;
                      </div>
                      <div  className='answer-doctor'>
                      {doctor.experience}
                      </div>
                    </div>
                    <div className='doctorList-1-right-fees'>
                    <div  className='heading-doctor'>
                        Fees :&nbsp;
                      </div>
                      <div  className='answer-doctor'>
                      {doctor.fees}
                      </div>
                    </div>
                    <div className='doctorList-1-right-available-time'>
                    <div  className='heading-doctor'>
                        Available Timings :&nbsp;
                      </div>
                      <div  className='answer-doctor'>
                      {doctor.availableTimings.day1} : {doctor.availableTimings.time1} <br /> {doctor.availableTimings.day2} : {doctor.availableTimings.time2}
                      </div>
                    </div>
                  </div>
                </div>



        </div>))}
    </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Final Confirmation !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3> Are you sure to get an appointment ? </h3>
          <table  className='border border-success rounded-bottom ms-5' >
          <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Doctor Name :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
                {Object.keys(doctdetail).length>0 ? doctdetail.name : "Null"}
              </td>
          </tr>
          <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Doctor Speciality :</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
                {Object.keys(doctdetail).length>0 ? doctdetail.specialization : "Null"}
              </td>
          </tr>
          <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Fees:</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
                {Object.keys(doctdetail).length>0 ? doctdetail.fees : "Null"}<br/>
              </td>
          </tr>
          <tr>
              <td style={{padding:"10px", color:"green"}}>
              <b>Available Timing:</b>
              </td>
              <td style={{padding:"10px", color:"blue"}}>
                {Object.keys(doctdetail).length>0 ? doctdetail.availableTimings.time1 : "Null"}<br/>
                {Object.keys(doctdetail).length>0 ? doctdetail.availableTimings.time2 : "Null"}
              </td>
          </tr>

          </table>
          {/* {Object.keys(doctdetail).length>0  ? doctdetail.availableTimings.time1 : "null"} */}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{
            // handleShowRegister();
            openRazorpay(doctdetail);
          }}>
            Yes
          </Button>
          <Button variant="primary" onClick={()=>{
            handleClose();
            // handleShowRegister();
          }}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home