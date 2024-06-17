const findSeats = (seats, count) => {
    const storeSeats = [];
    for (let i = 0; i < seats.length; i++) {
        if (!seats[i].isBooked) {
            storeSeats.push(seats[i]);
            if (storeSeats.length === count) {
                return storeSeats;
            }
        } else {
            storeSeats.length = 0; 
        }
    }
    return null;
};

export default findSeats