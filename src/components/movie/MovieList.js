import MovieItem from "../../model/MovieItem";
import List from '@mui/material/List';


function MovieList({allMovies}) {
    return (


        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {allMovies && allMovies.map(movie => <MovieItem movie={movie}/>)}
        </List>
    );
}

export default MovieList;