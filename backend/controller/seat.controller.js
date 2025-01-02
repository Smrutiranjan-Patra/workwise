const client = require("../config/db.js");

const getAllSeats = async (req, res) => {
  try {
    const query = await client.query(
      `SELECT * FROM seats ORDER BY rownumber, seatnumber;`
    );
    return res.status(200).json({
      data: query.rows,
      message: "Success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: [], message: "Failed", success: false });
  }
};

const resetAllBooking = async (req, res) => {
  try {
    const query = await client.query(
      `UPDATE seats SET isbooked = false WHERE isbooked = true;`
    );
    return res.status(200).json({
      data: [],
      message: "All Booking have been reseted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        data: [],
        message: "Unable to Reset the Bookings",
        success: false,
      });
  }
};

const bookSeats = async (req, res) => {
  const { seatCount } = req.body;

  if (seatCount <= 0 || seatCount > 7) {
    return res.status(400).json({
      success : false,
      message: "Seat count must be greater than 0 and less than or equal to 7",
    });
  }

  try {
    // Query all available seats, sorted by row and seat number
    const query = await client.query(
      `SELECT * FROM seats WHERE isbooked = false ORDER BY rownumber, seatnumber;`
    );

    const availableSeats = query.rows;

    if (availableSeats.length < seatCount) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // Group available seats by row
    const groupedByRow = availableSeats.reduce((acc, seat) => {
      acc[seat.rownumber] = acc[seat.rownumber] || [];
      acc[seat.rownumber].push(seat);
      return acc;
    }, {});

    // Try to find consecutive seats in the same row
    for (const row of Object.values(groupedByRow)) {
      for (let i = 0; i <= row.length - seatCount; i++) {
        const chunk = row.slice(i, i + seatCount);

        const isConsecutive = chunk.every(
          (seat, index, arr) =>
            index === 0 || seat.seatnumber === arr[index - 1].seatnumber + 1
        );

        if (isConsecutive) {
          // Mark seats as booked in the database
          const seatIds = chunk.map((seat) => seat.id);
          await client.query(
            `UPDATE seats SET isbooked = true WHERE id = ANY($1::int[])`,
            [seatIds]
          );

          return res.status(200).json({
            data: {
              bookedSeats: chunk,
            },
            message: "seats successfully booked",
            success: true,
          });
        }
      }
    }

    // If no consecutive seats found, book nearby available seats
    const bookedSeats = availableSeats.slice(0, seatCount);
    const bookedSeatIds = bookedSeats.map((seat) => seat.id);

    await client.query(
      `UPDATE seats SET isbooked = true WHERE id = ANY($1::int[])`,
      [bookedSeatIds]
    );

    return res.status(200).json({
      data: {
        bookedSeats,
      },
      message: "Seats successfully booked",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ data: [], message: "Server error", success: false });
  }
};

module.exports = { getAllSeats, resetAllBooking, bookSeats };
