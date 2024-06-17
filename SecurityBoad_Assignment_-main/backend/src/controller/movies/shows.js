import { Movie, Seat, Show } from '../../model/moviesSchema.js'

const createShow = async (req, res) => {
    const { movie, screen, startTime, price } = req.body;

    try {
        const checkMovie = await Movie.findOne({ title: movie });
        if (!checkMovie) {
            return res.status(400).json({ error: "Movie not found" });
        }

        const overlappingShow = await Show.findOne({screen});
        if (overlappingShow) {
            return res.status(400).json({ error: "Screen is already assigned to another movie at this time" });
        }

        const screenSeats = await Seat.find({ screen });
        if (screenSeats.length === 0) {
            return res.status(400).json({ error: "Screen not available" });
        }

        const newShow = new Show({ movie, screen, startTime, price });
        await newShow.save();
        res.status(201).json(newShow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error in create show" });
    }
};

const viewAllScreen = async(req , res) =>{
    try {
        const findScreen  = await Show.find()
        res.status(200).json(findScreen)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error in view screen"})
    }
}

const updateScreen = async(req , res) =>{

    const {screen , movie , startTime , price} = req.body

    try {

        const checkMovie = await Movie.findOne({ title: movie });
        if (!checkMovie) {
            return res.status(400).json({ error: "Movie not found" });
        }


        const checkScreen = await Show.findOneAndUpdate({screen},{$set:{movie , startTime , price}} , {new:true})
        res.status(200).json(checkScreen)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error in update screen function"})
    }
}


const deleteScreen = async(req , res) =>{
    const {screen, movie} = req.body
    try {
        const checkScreen = await Show.findOneAndDelete({screen,movie})
        if (!checkScreen){
            return res.status(400).json({error:"screen not found "})
        }

        res.status(200).json({message:"screen delete successfully...."})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error in delete screen function"})
    }
}


export { createShow , viewAllScreen , updateScreen , deleteScreen}