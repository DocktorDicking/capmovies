/**
 * This is an object literal which basically means this object contains declared properties which also can be logic.
 * With this Object literal I try to mimic a real Database helper class and to give some structure to the current source.
 * @constructor
 */
const DataManager = {

    /**
     * Async function to fetch the JSON blob movies.json.
     * Trying to mimic an actual Data helper object.
     * @return {Promise<*>}
     */
    async fetchMovies() {
        const response = await fetch('/movies.json');
        const data = await response.json();
        return data.movies;
    },

    /**
     * Searches the allMovies array for the movie with the given id and returns this movie.
     * Will return a movie if the movie exists. Will return an empty object when there is no movie with the given id.
     * @return movie {id, title, release_year, img_id} || {}
     * @param movies
     * @param id
     */
    getMovie(movies, id) {
        const movie = movies.find((movie) => movie.id ===  parseInt(id));

        // Same as shorthand if, this uses a logical || (OR) operation which results in a "short-circuit evaluation"
        return movie || {};
    },

    saveMovie({id, title, release_year, img_id}) {
        //todo
    },

    uploadImage() {
        //todo: not sure if we can do this in this 'demo' since we do not have a server or something where we can actually save the file to.
    }
}

export default DataManager;