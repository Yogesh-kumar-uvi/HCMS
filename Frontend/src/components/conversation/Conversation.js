import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ChatPage from "./ChatPage";

const Conversation = () => {
  const navigate = useNavigate();
  const message = (doctorID) => {
    console.log(doctorID);
    setDoctor(doctorID);
  };
  const closeChat = () => {
    setDoctor(null);
  };
  const [chatList, setChatList] = useState([]);
  const [doctor, setDoctor] = useState();

  const { user } = useSelector((state) => state.user);
  if (!user) {
    navigate("/");
  }
  useEffect(() => {
    const conversationList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/api/v1/getUniqueAppointments/${user.id}`
        );
        if (response.data.success) {
          setChatList(response.data.data);
        }
      } catch (error) {}
    };
    conversationList();
  }, []);

  return (
    <>
      <div className="search-doctor container float-center">
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
      <div className="doctorList container pt-5">
        <div>
          {chatList.map((notification, index) => (
            <>
              <div className="border rounded p-3 pt-2 bg-white" key={++index}>
                <div className="row text-center">
                  <div className="col">
                    <h5
                      style={{ paddingLeft: "5px" }}
                      className="text-start text-success bs-secondary"
                    >
                      {notification.doctor.name}
                    </h5>
                  </div>
                  <div className="col">
                    <p className="text-end text-warning">
                      {notification.doctor.specialization}
                    </p>
                  </div>
                </div>
                <div className="row text-center">
                  <Button
                    style={{
                      width: "30%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      message(notification.doctor._id);
                    }}
                  >
                    Chat Here
                  </Button>
                </div>
              </div>
              <br />
            </>
          ))}
        </div>
      </div>
      {doctor ? (
        <Modal show={doctor} onHide={closeChat}>
          <Modal.Header style={{ backgroundColor: "blue", color: "white" }}>
            <h2> Chat to Doctor</h2>
            <span style={{ cursor: "pointer" }} onClick={closeChat}>
              {" "}
              &times;{" "}
            </span>
          </Modal.Header>
          <Modal.Body>
            <ChatPage user={user.id} doctor={doctor} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Conversation;
