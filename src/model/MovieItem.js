function MovieItem({movie}) {
    const ext = '.jpg';
    const source = `/img/${movie.image_id}${ext}`;
    console.log(source);
    return (
        <li>
            <h2>{movie.title}</h2>
            <p>Release year: {movie.release_year}</p>
            <img src={source}/>
        </li>
    );
}

export default MovieItem;