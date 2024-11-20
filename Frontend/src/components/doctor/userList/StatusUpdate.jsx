import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const StatusUpdate = (props) => {
    const [status, setStatus] = useState();
    const change=async(option)=>{
        const formData = {
            doctorID:props.doctor,
            appointmentID:props.user._id
        }
        if(option==="approve"){
            try {
                const response = await axios.put(`http://localhost:8080/doctor/api/v1/approval`,formData);
                if(response.data.success){
                    alert("Approval Done")
                    message.success("Approval Done");
                    console.log("approve");
                    setStatus("Approved");
                }
            } catch (error) {
                message.error(error);
            }
        }else if(option==="cancel"){
            try {
                const response = await axios.put(`http://localhost:8080/doctor/api/v1/cancel`,formData);
                if(response.data.success){
                    alert("Cancellation Done")
                    message.success("Cancellation Done");
                    setStatus("Cancelled");
                }
            } catch (error) {
                message.error(error);
            }
        }else{
            try {
                const response = await axios.put(`http://localhost:8080/doctor/api/v1/complete`,formData);
                if(response.data.success){
                    message.success("Completion Done");
                    alert("Completion Done")
                    setStatus("Complete");
                }
            } catch (error) {
                message.error(error);
            }
        }

    }
    return (props.user?(
        <div>
          <div>
            <p><strong>Name:</strong> {props.user.user.name}</p>
            <p><strong>Mobile:</strong> +91 {props.user.user.phone}</p>
            <p><strong>Email:</strong> {props.user.user.email}</p>
            <p><strong>Status:</strong> {status ? status: props.user.status }</p>
            <p><Button onClick={()=>{change("approve")}}> Approve </Button> &nbsp;
            <Button variant="danger" onClick={()=>{change("cancel")}}> Cancel </Button> &nbsp;
            <Button variant="success" onClick={()=>{change("complete")}}> Complete </Button></p>
          </div>
        </div>
      ):""
    
      );
}

export default StatusUpdate