import { Seat, Show, Booking } from '../../model/moviesSchema.js';
import users from  '../../model/userSchema.js'
import findSeats from '../../middleware/seatBookingMiddleware.js'

const seatBooking = async (req, res) => {
    const { email, movie, seat, number } = req.body;

    try {
        const findUser = await users.findOne({email});
        if (!findUser) {
            return res.status(400).json({ error: "Please create your account" });
        }

        const findShow = await Show.findOne({movie });
        console.log(findShow);
        if (!findShow) {
            return res.status(400).json({ error: "Sorry, show is not found" });
        }

        const availableSeats = await Seat.find({ screen: findShow.screen, isBooked: false });

        const bookedSeats = findSeats(availableSeats, seat);
        if (!bookedSeats) {
            return res.status(400).json({ error: `Not enough consecutive seats available` });
        }

        const totalPrice = bookedSeats.length * findShow.price;
        const bookingTime = Date.now();

        await Seat.updateMany({ _id: { $in: bookedSeats.map(seat => seat._id) } }, { $set: { isBooked: true } });

        const booking = new Booking({
            email: findUser.email,
            movie: findShow.movie,
            seat: bookedSeats.map(seat => seat._id ),
            number : number, 
            bookingTime,
            totalPrice
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getBookedTickets = async (req, res) => {
    const {email} = req.body; 
    console.log('Email:', email);
    try {   
        const tickets = await Booking.findOne({ email });
        console.log('Tickets:', tickets);
        res.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const cancelSeatBooking = async (req, res) => {
    const { user } = req.body;
    try {
        const booking = await Booking.findOne({ user: user });
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        await Seat.updateMany({ _id: { $in: booking.seats } }, { $set: { isBooked: false } });

        await Booking.deleteOne({ _id: booking._id });

        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


export {seatBooking , cancelSeatBooking , getBookedTickets};
