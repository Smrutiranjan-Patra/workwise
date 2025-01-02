const router = require("express").Router();

const seatControllers = require('../controller/seat.controller.js');

router.get("/get/all", seatControllers.getAllSeats); // endpoint to get all seats

router.post("/reset", seatControllers.resetAllBooking); // endpoint to reset all bookings

router.post("/book", seatControllers.bookSeats); // endpoint to book seats

module.exports = router;
