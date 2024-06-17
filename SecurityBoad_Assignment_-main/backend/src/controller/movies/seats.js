import { Seat } from '../../model/moviesSchema.js'


const createSeats = async (req, res) => {
    const { screen, rowCount, seatCount, isBooked } = req.body;
    try {
        const seatsPerRow = Math.floor(seatCount / rowCount);
        if (seatsPerRow === 0) {
            return res.status(400).json({ message: 'seatCount must be greater than or equal to rowCount' });
        }

        const seats = [];
        for (let row = 1; row <= rowCount; row++) {
            for (let number = 1; number <= seatsPerRow; number++) {
                seats.push({
                    screen,
                    row,
                    number,
                    isBooked: isBooked || false  //if you give any value he update in db otherwise he update false
                });
            }
        }

        const createdSeats = await Seat.insertMany(seats);
        res.status(201).json(createdSeats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const viewAllSeat = async (req, res) => {
    try {
        const getSeat = await Seat.find()
        res.status(200).json(getSeat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error in get Seat function' });
    }
}

const updatedSeat = async (req, res) => {
    try {
        const { screen, row, number, isBooked } = req.body;

        const updatedSeat = await Seat.findOneAndUpdate(
            { screen, row, number },
            { $set: { isBooked } },
            { new: true, runValidators: true }
        );

        if (!updatedSeat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        res.status(200).json(updatedSeat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteSeats = async (req, res) => {
    const { screen } = req.body
    try {
        const deletedSeat = await Seat.findOneAndDelete({ screen });
        if (!deletedSeat) {
            return res.status(404).json({ message: 'Seat not found' });
        }
        res.status(200).json({ message: 'Seat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
export { createSeats, viewAllSeat, updatedSeat, deleteSeats }