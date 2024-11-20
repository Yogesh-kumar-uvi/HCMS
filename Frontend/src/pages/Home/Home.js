import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import Login from "../Login/Login";
import DoctorLogin from "../Doctor/DoctorLogin";
import Register from "../Registration/Register";
import DoctorRegistration from "../Doctor/DoctorRegistration";

const Home = () => {
  const [show, setShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  const [doctShow, setDoctShow] = useState(false);
  const [doctRegShow, setDoctRegShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowRegister = () => setRegShow(true);
  const handleCloseRegister = () => setRegShow(false);
  const handleCloseDoctor = () => setDoctShow(false);
  const handleShowDoctor = () => setDoctShow(true);
  const handleShowDoctorRegistration = () => setDoctRegShow(true);
  const handleCloseDoctorRegistration = () => setDoctRegShow(false);

  return (
    <>
      <div className="Nav-bar">
        <div className="Nav-bar-top">
          <div className="Nav-bar-top-left">
            <i class="fa-solid fa-hospital-user"></i> &nbsp; Home
          </div>
          <div className="Nav-bar-top-middle">
            <i class="fa-solid fa-heart-pulse"></i> &nbsp; HealthCare Management
          </div>
          <div className="Nav-bar-top-right">
            <div className="Nav-bar-top-right-1">Hospitals Near Me</div>
            <div className="Nav-bar-top-right-1">e-Clinic</div>
            <div className="Nav-bar-top-right-1">Login</div>
            <div className="Nav-bar-top-right-1">Emergency 108</div>
            <div className="Nav-bar-top-right-1">+91-124-1245-123</div>
          </div>
        </div>
        <div className="Nav-bar-bottom">
          <div className="Nav-bar-bottom-logo">
            <img src="https://www.healthcare-management-degree.net/wp-content/uploads/2016/09/cropped-healthcare-mgmt512.png"></img>
          </div>
          <div className="Nav-bar-bottom-middle"></div>
          <div className="Nav-bar-bottom-right">
            <div className="Nav-bar-bottom-right-1" onClick={handleShow}>
              Find A Doctor
            </div>
            <div className="Nav-bar-bottom-right-1" onClick={handleShow}>
              Treatments
            </div>
            <div className="Nav-bar-bottom-right-1" onClick={handleShow}>
              Specialities
            </div>
            <div className="Nav-bar-bottom-right-1" onClick={handleShow}>
              International Patients
            </div>
            <div className="Nav-bar-bottom-right-1" onClick={handleShow}>
              Facilities & Services
            </div>
            <div className="Nav-bar-bottom-right-2" onClick={handleShow}>
              <i class="fa-brands fa-searchengin"></i>
            </div>
            <div className="Nav-bar-bottom-right-3" onClick={handleShow}>
              Book An Appointment
            </div>
          </div>
        </div>
      </div>
      <div className="home123">
        <div className="home-left">
          <div className="home-left-features">
            <ul>
              <li>
                <div>
                  <i class="fa-regular fa-hand-point-right"></i>
                </div>
                <div> 100 + Doctors !!</div>
              </li>
              <li>
                <div>
                  <i class="fa-regular fa-hand-point-right"></i>
                </div>
                <div> 20 + Specifications !!</div>
              </li>
              <li>
                <div>
                  <i class="fa-regular fa-hand-point-right"></i>
                </div>
                <div> Online Payment Facility !!</div>
              </li>
              <li>
                <div>
                  <i class="fa-regular fa-hand-point-right"></i>
                </div>
                <div> User-Doctor Chat Enabled !!</div>
              </li>
              <li>
                <div>
                  <i class="fa-regular fa-hand-point-right"></i>
                </div>
                <div> UPI - Cards Acceptable !!</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="home-right">
          <div className="home-right-options">
            <div className="home-right-doctor-login" onClick={handleShowDoctor}>
              Doctor Login
            </div>
            <div
              className="home-right-doctor-registration"
              onClick={handleShowDoctorRegistration}
            >
              Doctor Registration
            </div>
            <div className="home-right-user-login" onClick={handleShow}>
              User Login{" "}
            </div>
            <div
              className="home-right-user-registration"
              onClick={handleShowRegister}
            >
              User Registration
            </div>
          </div>
        </div>
      </div>
      {/* <nav className="topNav nav nav-pills flex-column flex-sm-row mt-2">
          <Link
            className="flex-sm-fill text-center nav-link active"
            aria-current="page"
            to="#"
          >
            Home
          </Link>
          <Button
            variant="warning flex-sm-fill text-center nav-link btn btn-info"
            onClick={handleShow}
          >
            Login
          </Button>
          <Button
            variant="secondary flex-sm-fill text-center nav-link btn btn-info"
            onClick={handleShowRegister}
          >
            Register
          </Button>
          <Link
            className="secondary flex-sm-fill text-center nav-link btn btn-info"
            aria-disabled="true"
            onClick={handleShowDoctor}
          >
            Doctor
          </Link>
        </nav>
        <h1 className="heading display-3 text-center mt-2 mb-4 bold">
          HealthCare Management System
        </h1>
      </div> */}

      <Modal show={doctRegShow} onHide={handleCloseDoctorRegistration}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Registration Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorRegistration />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseDoctorRegistration();
              handleShowDoctor();
            }}
          >
            Already a Doctor? Login.
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={doctShow} onHide={handleCloseDoctor}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Login Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorLogin />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseDoctor();
              handleShowDoctorRegistration();
            }}
          >
            Not A Doctor? Register your profile.
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowRegister();
            }}
          >
            Not A User? Register.
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={regShow} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseRegister();
              handleShow();
            }}
          >
            Already A User? Login.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
