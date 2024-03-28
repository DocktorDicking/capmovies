import MovieItem from "../../model/MovieItem";


function MovieList({allMovies}) {
    return (
        <div>
            <ul>{allMovies && allMovies.map(movie => <MovieItem movie={movie} />)}</ul>
        </div>
    );
}

export default MovieList;