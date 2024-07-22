import React, { useEffect, useState } from 'react'
import '../userList/UserList.css'
import axios from 'axios';
import DoctorModal from './DoctorModal';
import { Modal } from 'react-bootstrap';

const Department = () => {
  const [users, setUsers] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModelOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/api/v1/getAllDoctors');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (doctor) => {
    console.log("open clicked");
    setSelectedDoctor(doctor);
    setModelOpen(true);
  };

  const closeModal = () => {
    console.log("close clicked");
    setSelectedDoctor(null);
    setModelOpen(false);
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr className='red-line'>
            <th>#</th>
            <th>Profile Pic</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email ID</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((user, index) => (
            <tr key={user.id} className={`${index % 2 === 0 ? "blue-line" : "black-line"}`}>
              <td>{index + 1}</td>
              <td><img src='https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-doctor-icon-circle-png-image_2055257.jpg' alt={user.name} className="profile-pic" /></td>
              <td>{user.name}</td>
              <td>+91 {user.phone}</td>
              <td>{user.email}</td>
              <td>{user.specialization}</td>
              <td><button className="action-button" onClick={() => openModal(user)}>Click</button></td>
            </tr>
          )) : <tr><td colSpan="7">No data</td></tr>}
        </tbody>
      </table>
      <Modal
        show={modalOpen}
        onHide={closeModal}
      >
        <Modal.Header style={{backgroundColor:"blue", color:"white"}}>
          <h3>Doctor Information</h3>
        <div style={{cursor:"pointer",fontSize:"20px",fontWeight:"bolder",color:"red",width:"" }} onClick={closeModal}>&times;</div>
        </Modal.Header>

        <Modal.Body>
            <DoctorModal doctor={selectedDoctor}/>
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default Department;
