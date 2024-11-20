import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import DoctorProfile from "../../components/doctor/DoctorProfile.jsx";
import UserList from "../../components/doctor/userList/UserList.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDoctor } from "../../Redux/DoctorSlice.jsx";
import { message } from "antd";

import {
  faTachometerAlt,
  faHospital,
  faUserMd,
  faUser,
  faUserNurse,
  faFlask,
  faUsers,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import "./Doctor.css"; // Assuming you have a CSS file for styling
import NurseList from "../../components/doctor/nurseList/nurseList.jsx";
import PharmacistList from "../../components/doctor/pharmacistList/PharmacistList.jsx";
import Department from "../../components/doctor/department/Department.jsx";
import Payment from "../../components/doctor/Payment.jsx";
import axios from "axios";

const Doctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeOption, setActiveOption] = useState("dashboard");
  const [departmentShow, setDepartmentShow] = useState(false);
  const [doctorShow, setDoctorShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);
  const [patientShow, setPatientShow] = useState(false);
  const [nurseShow, setNurseShow] = useState(false);
  const [pharmacistShow, setPharmacistShow] = useState(false);

  const handleClosePayment = () => setPaymentShow(false);
  const handleShowPayment = () => setPaymentShow(true);

  const handleClosePatient = () => setPatientShow(false);
  const handleShowPatient = () => setPatientShow(true);

  const handleCloseDoctor = () => setDoctorShow(false);
  const handleShowDoctor = () => setDoctorShow(true);

  const handleCloseNurse = () => setNurseShow(false);
  const handleShowNurse = () => setNurseShow(true);

  const handleClosePharmicist = () => setPharmacistShow(false);
  const handleShowPharmicist = () => setPharmacistShow(true);

  const handleCloseDepartment = () => setDepartmentShow(false);
  const handleShowDepartment = () => setDepartmentShow(true);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const { doctor } = useSelector((state) => state.doctor);
  const logOutFunction = async () => {
    await axios.put(
      `http://localhost:8080/appointment/api/v1/offline-doctor/${doctor._id}`
    );
    dispatch(setDoctor(null));
    localStorage.removeItem("token");
    navigate("/");
    message.success("Logout Successfully");
  };
  return (
    <>
      <Modal
        show={pharmacistShow}
        onHide={handleClosePharmicist}
        style={{ marginLeft: "-15%" }}
      >
        <Modal.Header
          closeButton
          style={{
            width: "900px",
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title>Pharmacist List</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PharmacistList />
        </Modal.Body>
        <Modal.Footer
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              handleClosePharmicist();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={nurseShow}
        onHide={handleCloseNurse}
        style={{ marginLeft: "-15%" }}
      >
        <Modal.Header
          closeButton
          style={{
            width: "900px",
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title>Nurse List</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NurseList />
        </Modal.Body>
        <Modal.Footer
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              handleCloseNurse();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={patientShow}
        onHide={handleClosePatient}
        style={{ marginLeft: "-15%" }}
      >
        <Modal.Header
          closeButton
          style={{
            width: "900px",
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title>Patient Details - List</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <UserList />
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              handleClosePatient();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={paymentShow}
        onHide={handleClosePayment}
        style={{ marginLeft: "-15%" }}
      >
        <Modal.Header
          closeButton
          style={{
            width: "900px",
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Payment />
        </Modal.Body>
        <Modal.Footer
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              handleClosePayment();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={departmentShow}
        onHide={handleCloseDepartment}
        style={{ marginLeft: "-15%" }}
      >
        <Modal.Header
          closeButton
          style={{
            width: "900px",
            backgroundColor: "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title>Department</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Department />
        </Modal.Body>
        <Modal.Footer
          style={{
            width: "900px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            onClick={() => {
              handleCloseDepartment();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={doctorShow} onHide={handleCloseDoctor}>
        <Modal.Header closeButton style={{ backgroundColor: "green" }}>
          <Modal.Title>Doctor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorProfile />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseDoctor();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="doctor-container">
        <div className="header">
          <div className="header-title">
            Hospital Management - Doctor Pannel
          </div>
          <div className="dropdown">
            <button className="dropbtn">Account</button>
            <div className="dropdown-content">
              <a
                href="#"
                onClick={() => {
                  setDoctorShow(true);
                }}
              >
                Profile
              </a>
              <a
                href="#"
                onClick={() => {
                  setDoctorShow(true);
                }}
              >
                Update
              </a>
              <a href="#" onClick={() => logOutFunction()}>
                Log Out
              </a>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="grid-container">
            <div
              className="grid-item item1"
              onClick={() => {
                handleOptionClick("department");
                handleShowDepartment();
              }}
            >
              <FontAwesomeIcon icon={faHospital} />
            </div>
            <div
              className="grid-item item2"
              onClick={() => {
                handleOptionClick("Patient");
                handleShowPatient();
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div
              className="grid-item item3"
              onClick={() => {
                handleOptionClick("doctor");
                handleShowDoctor();
              }}
            >
              <FontAwesomeIcon icon={faUserMd} />
            </div>
            <div
              className="grid-item item4"
              onClick={() => {
                handleOptionClick("Payment");
                handleShowPayment();
              }}
            >
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <div
              className="grid-item item5"
              onClick={() => {
                handleOptionClick("Nurse");
                handleShowNurse();
              }}
            >
              <FontAwesomeIcon icon={faUserNurse} />
            </div>
            <div
              className="grid-item item6"
              onClick={() => {
                handleOptionClick("Pharmacist");
                handleShowPharmicist();
              }}
            >
              <FontAwesomeIcon icon={faFlask} />
            </div>
          </div>
        </div>
        <div className="sidebar">
          <ul className="sidebar-list">
            <li
              className={`sidebar-item ${
                activeOption === "dashboard" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("dashboard");
              }}
            >
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className="sidebar-text">Dashboard</span>
            </li>
            <li
              className={`sidebar-item ${
                activeOption === "department" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("department");
                handleShowDepartment();
              }}
            >
              <FontAwesomeIcon icon={faHospital} />
              <span className="sidebar-text">Department</span>
            </li>
            <li
              className={`sidebar-item ${
                activeOption === "doctor" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("doctor");
                handleShowDoctor();
              }}
            >
              <FontAwesomeIcon icon={faUserMd} />
              <span className="sidebar-text">Doctor Profile</span>
            </li>

            <li
              className={`sidebar-item ${
                activeOption === "Payment" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("Payment");
                handleShowPayment();
              }}
            >
              <FontAwesomeIcon icon={faMoneyBill} />
              <span className="sidebar-text">Payment</span>
            </li>

            <li
              className={`sidebar-item ${
                activeOption === "Patient" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("Patient");
                handleShowPatient();
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span className="sidebar-text">Patient</span>
            </li>

            <li
              className={`sidebar-item ${
                activeOption === "Nurse" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("Nurse");
                handleShowNurse();
              }}
            >
              <FontAwesomeIcon icon={faUserNurse} />
              <span className="sidebar-text">Nurse</span>
            </li>

            <li
              className={`sidebar-item ${
                activeOption === "Pharmacist" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("Pharmacist");
                handleShowPharmicist();
              }}
            >
              <FontAwesomeIcon icon={faFlask} />
              <span className="sidebar-text">Pharmacist</span>
            </li>
            {/* Add more options here */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Doctor;
