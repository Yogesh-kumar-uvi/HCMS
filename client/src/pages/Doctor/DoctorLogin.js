import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDoctor } from "../../Redux/DoctorSlice";

const DoctorLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      //   dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/doctor/api/v1/login",
        formData
      );
      //   dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        const res2 = await axios.post(
          "http://localhost:8080/doctor/api/v1/getDoctor",
          { token: localStorage.getItem("token") },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          dispatch(setDoctor(res2.data.data));
        }
        message.success("Login Successfully");
        navigate("/Doctor");
      } else {
        message.error("Enter correct credentials");
      }
    } catch (error) {
      message.error("Enter correct credentials");
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleInputEmail1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleInputPassword1">
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
    </>
  );
};

export default DoctorLogin;
