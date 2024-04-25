/**
 * This is an object literal which basically means this object contains declared properties which also can be logic.
 * With this Object literal I try to mimic a real Database helper class and to give some structure to the current source.
 * @constructor
 */
const DataManager = {

    /**
     * Async function to fetch the JSON blob movies.json from the public folder in this project.
     * It will save the Blob in the browsers localstorage as a "database" where we can kind of persist data for this
     * demo application.
     *
     * @return {Promise<*>}
     */
    async fetchMovies() {
        let movies;

        //Check if the movies JSON is available in the localStorage or fetch the JSON blob from /public folder.
        if (localStorage.getItem("movies")) {
            // Part after '||' is a fallback.
            movies = JSON.parse(localStorage.getItem("movies") || '[]');
        } else {
            // Fetch movies.json from /public folder and save to localStorage.
            const response = await fetch('/movies.json');
            const data = await response.json();
            movies = data.movies;

            localStorage.setItem("movies", JSON.stringify(movies));
        }

        return movies;
    },

    /**
     * Searches the allMovies array for the movie with the given id and returns this movie.
     * Will return a movie if the movie exists. Will return an empty object when there is no movie with the given id.
     * @return movie || {}
     * @param id
     */
    getMovie(id) {
        if (localStorage.getItem("movies")) {
            const movies = JSON.parse(localStorage.getItem("movies"));
            const movie = movies.find((movie) => movie.id ===  parseInt(id));

            // Same as shorthand if, this uses a logical || (OR) operation which results in a "short-circuit evaluation"
            return movie || {};
        }

        return {};
    },

    /**
     *
     * @param movie
     */
    saveMovie(movie) {
        //Destructured the object so my IDE stops screaming warnings.
        const {id, title, release_year, img_id} = movie;
        console.log(movie.id, movie.title);
    },

    uploadImage() {
        //todo: not sure if we can do this in this 'demo' since we do not have a server or something where we can actually save the file to.
    }
}

export default DataManager;