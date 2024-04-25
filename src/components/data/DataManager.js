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

    getMovies() {
        //todo return all movies?
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
     * Tries to save the given movie object to the localStorage of the browser.
     * @param movie
     */
    saveMovie(movie) {
        let movies;

        if (JSON.parse(localStorage.getItem("movies"))) {
            movies = JSON.parse(localStorage.getItem("movies"));

            // Check if the movie object we are trying to save exists in the movies array
            if (movies.find((m) => m.id === parseInt(movie.id))) {
                // Using map to update the movie object based on the given movie.id.
                movies.map((m) => {
                    if (m.id === parseInt(movie.id)) {
                        m.title = movie.title;
                        m.release_year = movie.release_year;
                        // m.image_id = movie.image_id;
                    }
                });

                // Save the updated movies array in the localStorage.
                localStorage.setItem("movies", JSON.stringify(movies));
                return true;
            } else {
                // Give the new movie object the next available id.
                movie.id = this.getNextId(movies);

                // Save the movie to the movies array and update the localStorage.
                movies.push(movie);
                localStorage.setItem("movies", JSON.stringify(movies));
                return true;
            }
        }

        return false;

    },

    /**
     * Will return the nextId available for a new movie object.
     * This method will be called when a new movie will be added.
     * @param movies
     * @return {number}
     */
    getNextId(movies) {
        let highestId = 1;

        // Loop through the movies array and check each movie (m) to determine the current highest id.
        movies.forEach(m => {
            if (m.id > highestId) highestId = m.id;
        });

        // Finally return the new id which is the found highest id + 1
        return (highestId + 1);
    },

    /**
     * We might implement this but since we do not have a decent filesystem atm we cannot save images.
     * Using base64 for images is a bad idea for prod environments since the base64 will probably take up more space
     * then just the image.
     */
    uploadImage() {
        //todo: we might do this but this requires some way of saving an image to the LocalStorage. Maybe with Base64 encoding.
    }
}

export default DataManager;