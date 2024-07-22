import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/User.css";

import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/AlertSlice";
import { setUser } from "../../Redux/UserSlice";
import { message } from "antd";

const User = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(showLoading());
    dispatch(setUser(null));
    localStorage.removeItem("token");
    navigate("/");
    message.success("Logout Successfully");
    dispatch(hideLoading());
  };
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   const [navi,setNav] = React.useState('Home');
  // console.log(navi);

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
      <div className="user123">
        <Offcanvas
          className="side-bar"
          show={show}
          onHide={handleClose}
          placement="start"
        >
          <Offcanvas.Header
            className="side-bar-top"
            style={{ color: "white" }}
            closeButton
          >
            <div className="side-bar-1">
              <img src="https://www.healthcare-management-degree.net/wp-content/uploads/2016/09/cropped-healthcare-mgmt512.png"></img>
            </div>
            <div className="side-bar-2"> HealthCare Management</div>
            <Offcanvas.Title>
              {" "}
              <div className="side-bar-3">
                {/* {user.name} - Logged In */}
                {user ? user.name : ""}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <div className="side-bar-middle">
            <div className="side-bar-middle-1">Main Menu</div>
            <div className="side-bar-middle-options">
              <ul>
                <li>
                  <Link className="side-bar-middle-option-1" to="">
                    <div>
                      <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div> Home</div>
                  </Link>
                </li>
                <li>
                  <Link className="side-bar-middle-option-1" to="Notification">
                    <div>
                      <i class="fa-regular fa-bell"></i>
                    </div>
                    <div> Notifications</div>
                  </Link>
                </li>
                <li>
                  <Link className="side-bar-middle-option-1" to="Appointments">
                    <div>
                      <i class="fa-regular fa-calendar-check"></i>
                    </div>
                    <div>Appointments</div>
                  </Link>
                </li>
                <li>
                  <Link className="side-bar-middle-option-1" to="Conversation">
                    <div>
                      <i class="fa-solid fa-headset"></i>
                    </div>
                    <div> Chat</div>
                  </Link>
                </li>
                <li>
                  <div
                    className="side-bar-middle-option-1"
                    onClick={() => logout()}
                  >
                    <div>
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                    <div> Logout</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Offcanvas>
        <Button
          className="optionNavigation"
          variant="primary"
          onClick={handleShow}
        >
          Options
        </Button>
        <Outlet />
      </div>
    </>
  );
};

export default User;
