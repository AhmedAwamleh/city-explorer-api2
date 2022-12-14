const axios = require(`axios`);
async function handleMovie(req, res) {
    const { searchQuery, lat, lon } = req.query;
    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)

    try {
        const movieData = movieArr.data.results.map(item => new movie(item));
        res.status(200).send(movieData)

    } catch (error) {
        errorMes(error, res)
    }
}
class movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.avearge_votes = movie.vote_avearge;
        this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
        this.total_votes = movie.vote_count;
    }
}


module.exports = { handleMovie };