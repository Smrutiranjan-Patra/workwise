import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    // If token, redirect to the home page
    if (token && token !== "") {
      router.push("/");
    }
  }, [router]); // The router dependency ensures the effect runs when the page loads

  const validateForm = () => {
    const { email, password, name } = formData;
    if (email === "" || password === "" || name === "") {
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

  const register = () => {
    if (validateForm()) {
      axios
        .post(`${baseUrl}/api/auth/register`, formData)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
              router.push("/login");
            }, 1000);
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
        <label for="exampleInputEmail1">name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter name"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </div>
      <div className="btn-group">
        <button
          type="primary"
          className="btn btn-primary"
          onClick={() => register()}
        >
          Resigter
        </button>
        <button
          type="primary"
          className="btn btn-secondary"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default Register;
