import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setDoctor } from "../../Redux/DoctorSlice";
import { message } from 'antd';

import './DoctorProfile.css'

const DoctorProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [edite, setEdite] = useState(false);
    const { doctor } = useSelector((state) => state.doctor);
    const edit =()=> {
    if(doctor){
        setEdite(true);
        }
    }
    const [formData, setFormData] = useState({
        doctorID:doctor._id,
        name:'',
        phone:'',
        specialization:'',
        experience:'',
        fees:'',
        email: '',
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    const save = async()=>{
        console.log(formData);
        const res = await axios.put('http://localhost:8080/doctor/api/v1/',formData);
        console.log(res);
        if(res.status===200){
            dispatch(setDoctor(res.data.data));
            message.success("Updated Successfully");
            navigate("/");
        }else{
            message.error("Try again");
        }
        setEdite(false);
    }
  return (
    <>
    <div className='doctor-background'>
        {edite ? 
        (<>
            <div className='left'>
            <div className='heading-doctor-profile'>
                PROFILE
            </div>
            <div className='answer'>
                <input type='text' name='name' placeholder={doctor.name} value={formData.name} onChange={handleChange}></input>
            </div>

            <div className='heading-doctor-profile'>
                SPECIALITY
            </div>
            <div className='answer'>
                <input type='text' name='specialization' placeholder={doctor.specialization} value={formData.specialization} onChange={handleChange}></input>
            </div>

            <div className='heading-doctor-profile'>
                EXPERIENCE
            </div>
            <div className='answer'>
                <input type='text' name='experience' placeholder={doctor.experience} value={formData.experience} onChange={handleChange}></input>
            </div>

            <div className='heading-doctor-profile'>
                CONTACT
            </div>
            <div className='answer'>
                <input type='tell' name='phone' placeholder={doctor.phone} value={formData.phone} onChange={handleChange}></input>
            </div>

            <div className='heading-doctor-profile'>
                E-mail
            </div>
            <div className='answer'>
                <input type='email' name='email' placeholder={doctor.email} value={formData.email} onChange={handleChange}></input>
            </div>
        </div>
        <div className='right'>
            <div className='edit' style={{cursor:"pointer"}} onClick={save}>
                Save
            </div>
            <div className='heading-doctor-profile'>
                FEES
            </div>
            <div className='answer'>
                <input type='text' name='fees' style={{width:"80px"} } placeholder={doctor.fees} value={formData.fees} onChange={handleChange}></input>
            </div>
        </div>
        </>):
        (<><div className='left'>
            <div className='heading-doctor-profile'>
                PROFILE
            </div>
            <div className='answer'>
                <b>{doctor ? doctor.name.toUpperCase():"DR. JAMES GRAHAM"}  </b><br/>
                MBBS <br />
                Apollo Hospital, New Delhi

            </div>

            <div className='heading-doctor-profile'>
                SPECIALITY
            </div>
            <div className='answer'>
             {doctor ? doctor.specialization:"CARDIOLOGY"} <br/>
            </div>

            <div className='heading-doctor-profile'>
                EXPERIENCE
            </div>
            <div className='answer'>
            {doctor ? doctor.experience:"20"} Years+<br/>
            </div>

            <div className='heading-doctor-profile'>
                CONTACT
            </div>
            <div className='answer'>
                +91 {doctor ? doctor.phone:"9876564534"} <br/>
            </div>

            <div className='heading-doctor-profile'>
                E-mail
            </div>
            <div className='answer'>
             {doctor ? doctor.email:"doctor@gmail.com"}<br/>
            </div>
        </div>
        <div className='right'>
            <div className='edit' style={{cursor:"pointer"}} onClick={edit}>
                Edit 
            </div>
            <div className='heading-doctor-profile'>
                FEES
            </div>
            <div className='answer'>
            {doctor ? doctor.fees:"200"}/-
            </div>
        </div></>)}
    </div>
    </>
  )
}

export default DoctorProfile