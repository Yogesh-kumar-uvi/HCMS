import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { message } from "antd";

const Notification = () => {
      const [notificationL, setNotificationL] = useState([]);
      const [df, setDF] = useState(false);
      const [notificationDependency, setNotificationDependency] = useState(0);
      
      const { user } = useSelector((state) => state.user);
      const callingNotificationAPI = async() =>{
        try {
          const notificationList = await axios.get(`http://localhost:8080/notification/api/v1/${user.id}`)
          if(notificationList.status === 200){
            setNotificationL(notificationList.data.data.reverse());
            console.log(notificationL);
            setDF(true)
          }
        } catch (error) {
          
        }
      }
      useEffect(()=>{
        callingNotificationAPI();
      },[])

      const msgSeen = async(id) =>{
        if(id.seen){
          message.error("Notification already seen");
          return
        }
        const respnse = await axios.put(`http://localhost:8080/notification/api/v1/`,{notificationID:id._id})
        if(respnse.status === 200){
          message.success("message seen")
        }
      }
  return (
    <>
    {df ? <>
      <div className='doctorList container pt-5'>
        
        {
          notificationL.map((notification)=>(
            
            <div style={{cursor:"pointer"}} className='border rounded p-3 pt-2 bg-white' onClick={()=>msgSeen(notification)} key={notification.appointment}>
            <div className='row text-center'>
            {notification.seen ? <>
              <div style={{width:"10px", height:"10px", borderRadius:"10px", backgroundColor:"red"}}>
            </div>
            </>:<>
            <div style={{width:"10px", height:"10px", borderRadius:"10px", backgroundColor:"green"}}>
            </div>
            </>}
                  <div className='col'>
                  <h5 style={{paddingLeft:"5px"}} className='text-start text-success bs-secondary'>{notification.appointment.doctor.name}</h5>
                  </div>
                  <div className='col'>
                      <p className='text-end text-warning'>
                          {notification.updatedAt}
                      </p>
                  </div>
                  
              </div>
              <div className='row text-center'>
                  <h5>{notification.message}</h5>
              </div>
            </div>
          ))
        
        }
      </div>
    
    </> : <div>No Notifications Found</div>}
            {/* Doctor List */}

    </>
  )
}

export default Notification