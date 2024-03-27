import MovieItem from "../../model/MovieItem";


function MovieList({allMovies}) {
    return (
        <div>
            <p>Movie List</p>
            <MovieItem />
        </div>
    );
}

export default MovieList;