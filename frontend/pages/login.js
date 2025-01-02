import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    // If token, redirect to the home page
    if (token && token !== "") {
      router.push("/");
    }
  }, [router]); // The router dependency ensures the effect runs when the page loads

  const validateForm = () => {
    const { email, password } = formData;
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return false;
    }
    if (email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }
    return true;
  };

  const login = () => {
    if (validateForm()) {
      axios
        .post(`${baseUrl}/api/auth/login`, formData)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            router.push("/");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error("An error occurred. Please try again later.");
        });
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e)=> {setFormData({...formData, email: e.target.value})}}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e)=> {setFormData({...formData, password: e.target.value})}}
        />
      </div>
      <div className="btn-group">
        <button
          type="primary"
          className="btn btn-primary"
          onClick={() => login()}
        >
          Login
        </button>
        <button type="primary" className="btn btn-secondary" onClick={() => router.push("/register")}>
          Create New Account
        </button>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default Login;
