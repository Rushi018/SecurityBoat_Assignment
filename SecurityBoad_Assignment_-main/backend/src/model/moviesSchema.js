import mongoose from 'mongoose'

const moviesSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: Number,
    releaseDate: String,
    genre: [String],
    rating: Number,
    poster: String

})

const showSchema = new mongoose.Schema({
    movie: {
        type: String, required: true
    },
    screen: {
        type: String, required: true
    },
    startTime: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    }
});

const seatSchema = new mongoose.Schema({
    screen: {
        type: String, required: true
    },
    row: {
        type: Number, required: true
    },

    number: {
        type: Number, required: true
    },

    isBooked: {
        type: Boolean, default: false
    },

});

const bookingSchema = new mongoose.Schema({
    email: {
        type: String , required : true
    },

    movie: {
        type: String , required : true
    },

    number:{
        type:Number , required:true
    },  
    seat: [{
        type: String , required : true
    }],

    bookingTime: {
        type:Date, default: Date.now
    },

    totalPrice: {
        type: Number, required: true
    },

});

const Movie = mongoose.model('Movie', moviesSchema);

const Booking = mongoose.model('Booking', bookingSchema);

const Seat = mongoose.model('Seat', seatSchema);

const Show = mongoose.model('Show', showSchema);

export { Movie, Booking, Seat, Show }