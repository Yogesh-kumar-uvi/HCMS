import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    fees: "",
    password: "",
    day1: "",
    time1: "",
    day2: "",
    time2: "",
  });

  const [showModal, setShowModal] = useState(false); // State for controlling the modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/doctor/api/v1/registration",
        formData
      );
      if (response.status === 200) {
        setShowModal(true); // Show the modal
      } else if (response.status === 200) {
        console.log("hh");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Enter your phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your contact with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Specialization</Form.Label>
          <Form.Control
            type="text"
            name="specialization"
            placeholder="Enter your specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">eg., Dermatologist etc.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            name="experience"
            placeholder="Enter your experience"
            value={formData.experience}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Write your experience in Years.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Fees</Form.Label>
          <Form.Control
            type="text"
            name="fees"
            placeholder="Enter your fees"
            value={formData.fees}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Write your fees in rupees.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Time: Day 1</Form.Label>
          <Form.Control
            type="text"
            name="day1"
            placeholder="Enter your day1 timing"
            value={formData.day1}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Time: Time for day 1</Form.Label>
          <Form.Control
            type="text"
            name="time1"
            placeholder="Enter your time1 timing"
            value={formData.time1}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Time: Day 2</Form.Label>
          <Form.Control
            type="text"
            name="day2"
            placeholder="Enter your day2 timing"
            value={formData.day2}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Time: Time for day 2</Form.Label>
          <Form.Control
            type="text"
            name="time2"
            placeholder="Enter your time2 timing"
            value={formData.time2}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleCheck1">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Modal for showing the "Registration successful" message */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your registration was successful. You can now login with your
          credentials.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorRegistration;
