import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { add } from "../../Redux/TokenSllice";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../Redux/AlertSlice";
import { message } from "antd";
import { setUser } from "../../Redux/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
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
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/user/api/v1/login",
        formData
      );
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        const res2 = await axios.post(
          "http://localhost:8080/user/api/v1/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          dispatch(setUser(res2.data.data));
        }
        message.success("Login Successfully");
        navigate("/User");
      } else {
        console.log();
        alert("Credentials not matched");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error:", error);
      message.error("Credentials not matched");
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

export default Login;
