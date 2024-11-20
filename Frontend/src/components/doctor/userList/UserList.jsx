import React, { useEffect, useState } from 'react'
import './UserList.css'
import axios from 'axios';
import {  useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Modal} from "react-bootstrap";
import StatusUpdate from './StatusUpdate';
import ChatPage from './ChatPage';

// const users = [
//   { id: 1, name: 'John Doe', mobile: '123-456-7890', email: 'john.doe@example.com', start_date: '2024-03-11', profilePic: 'https://th.bing.com/th/id/OIP.Jg_SqbgXBk3ZLQ82dXS4zQHaJd?rs=1&pid=ImgDetMain' },
//   { id: 2, name: 'Jane Smith', mobile: '987-654-3210', email: 'jane.smith@example.com', start_date: '2024-03-12', profilePic: 'https://th.bing.com/th/id/OIP.Jg_SqbgXBk3ZLQ82dXS4zQHaJd?rs=1&pid=ImgDetMain' },
//   { id: 3, name: 'Alice Johnson', mobile: '555-555-5555', email: 'alice.johnson@example.com', start_date: '2024-03-13', profilePic: 'https://th.bing.com/th/id/OIP.Jg_SqbgXBk3ZLQ82dXS4zQHaJd?rs=1&pid=ImgDetMain' },
// ];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false);
  const [statusID, setStatuusID] = useState();
  const [chatShow, setChatShow] = useState(false);
  const [chat, setChat] = useState();
  const closeChat = () =>{
    setChatShow(false);
    setChat(null);
  }

  const openChat = (data)=>{
    setChatShow(true);
    setChat(data);
  }

  const closeStatus = () =>{
    setStatus(false);
  }
  const openStatus = (id) =>{
    console.log(id);
    setStatuusID(id);
    setStatus(true);
  }
  const navigate = useNavigate();
  const { doctor } = useSelector((state) => state.doctor);
  console.log(doctor);
  if(!doctor){
    navigate("/");
  }
  const formData = {
    "doctorID":doctor._id
  }
  console.log(formData);
  useEffect(()=>{
    const userList=async()=>{
      try {
        const response = await axios.get(`http://localhost:8080/doctor/api/v1/doctorAppointments/${doctor._id}`);
        console.log(response.data.message);
        if(response.data.success){
          console.log(response.data.data);
          setUsers(response.data.data.reverse())
        }
      } catch (error) {

      }
    }
    userList();
  },[])
  return (
    <>
    <table className="user-table">
      <thead>
        <tr className='red-line'>
          <th>No.</th>
          <th>Profile Pic</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>Email ID</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users ? users.map((user, index) => (
          <tr key={user._id} className={`${index%2===0 ? "blue-line":"black-line"}`}>
            <td>{++index}</td>
          <td><img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt={user.name} className="profile-pic" /></td>
            <td style={{cursor:"pointer"}} onClick={()=>openChat(user)}>{user.user.name}</td>
            <td>+91-{user.user.phone}</td>
            <td>{user.user.email}</td>
            <td>{user.status}</td>
            <td><button className="action-button" onClick={()=>openStatus(user)}>Click</button></td>
          </tr>
        )):""}
      </tbody>
    </table>
    <Modal show={status} onHide={closeStatus}>
    <Modal.Header style={{backgroundColor:"blue", color:"white"}}>
          <h3>Appointment Information</h3>
        <div style={{cursor:"pointer",fontSize:"20px",fontWeight:"bolder",color:"red",width:"" }} onClick={closeStatus}>&times;</div>
        </Modal.Header>
        <Modal.Body>
          <StatusUpdate user={statusID} doctor={doctor._id} />
        </Modal.Body>
    </Modal>

    <Modal show={chatShow} onHide={closeChat}>
          <Modal.Header style={{backgroundColor:"blue", color:"white"}}>
          <h3>Chat To Patient</h3>
        <div style={{cursor:"pointer",fontSize:"20px",fontWeight:"bolder",color:"red",width:"" }} onClick={closeChat}>&times;</div>
          </Modal.Header>
          <Modal.Body>
            {chat ? <ChatPage user={chat.user._id} doctor={doctor._id} /> :""}
          
        </Modal.Body>
    </Modal>
    </>
  );
};



export default UserList