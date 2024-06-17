import { Movie} from '../../model/moviesSchema.js';

const addMovies = async (req, res) => {
    const { title } = req.body
    try {
        const addMovies = await Movie.findOne({ title })

        if (addMovies) {
            return res.status(400).json({ error: "Movies already exist " })
        }

        const submit = new Movie(req.body)
        await submit.save()
        res.status(201).json(submit)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in add movies function " })
    }
}


const movieDetails = async (req, res) => {

    const searchKey = req.query.title
    try {
        const getMovie = await Movie.find({
            $or: [
                { title: { $regex: searchKey, $options: 'i' } }
            ]
        });

        if (getMovie.length === 0) {
            return res.status(400).json({ error: "This movie is not available" });
        }

        res.status(200).json(getMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong in the search function" });
    }
};


const getMovies = async(req ,res) => {
    try {
        const findMovies = await Movie.find()

        res.status(200).json({findMovies})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error in get movies "})
    }
}
export  { addMovies, movieDetails , getMovies}