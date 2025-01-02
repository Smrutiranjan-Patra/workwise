import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login";

const HomePage = () => {
  const router = useRouter();

  const [seats, setSeats] = useState([]);
  const [seatCount, setSeatCount] = useState("");

  // this use effect will run when the page loads and used for routing purpose
  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    // If no token, redirect to the login page
    if (!token || token === "") {
      router.push("/login");
    } else {
      // If token exists, continue with the normal page
      // Optionally, you can fetch user data or perform other checks here
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, []);

  //  used to fetch the data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/seats/get/all"
      );
      if (response.data.success) {
        setSeats(response.data.data);
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      alert("Failed to fetch seats data. Please try again later.");
    }
  };

  // used to update the seat count input change
  const handleSeatCountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setSeatCount(Number(value));
    }
  };

  // used to book the seats
  const bookSeats = async () => {
    if (seatCount <= 0 || seatCount > 7) {
      setSeatCount("");
      toast.error("Invalid Seat Count");
      return;
    }

    axios.post("http://localhost:5000/api/seats/book", { seatCount })
    .then((res) => {
      if(res.data.success) {
        toast.success(res.data.message);
        setSeatCount("");
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((error) => {
      toast.error("Unable to Book the Seats");
      console.log("Error:", error);
    });
  };

  const resetAllBooking = async () => {
    const NotBookedSeats = seats.filter((seat) => seat.isbooked);

    if(NotBookedSeats.length === 80) {
      toast.error("All seats are available Now");
      return;
    }

    axios.post("http://localhost:5000/api/seats/reset")
    .then((res) => {
      if(res.data.success){
        toast.success(res.data.message);
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      
    })
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <React.Fragment>
    <button type="button" className="btn btn-danger logout-btn" onClick={() => {logout()}}>Logout</button>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h1>Seat Booking App</h1>
        <div className="layout-container">
          <div>
            <p>Seating Layout</p>
            <div className="seat-container">
              {Array.from({ length: Math.ceil(seats.length / 7) }).map(
                (_, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {seats.slice(rowIndex * 7, rowIndex * 7 + 7).map((seat) => (
                      <div key={seat.id} className="col-1">
                        <div className={seat.isbooked ? "seat booked" : "seat available"}>{seat.id}</div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            {/* input and action buttons */}
            <div className="seat-booking-form">
              <label htmlFor="formGroupExampleInput">Seat Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Provide seat Count"
                value={seatCount}
                onChange={(e) => {
                  handleSeatCountChange(e);
                }}
              />
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  bookSeats();
                }}
              >
                Book Seats
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  resetAllBooking();
                }}
              >
                Reset All Booking
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
    </React.Fragment>
  );
};

export default HomePage;
