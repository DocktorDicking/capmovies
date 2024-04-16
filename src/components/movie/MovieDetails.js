import {useParams} from "react-router-dom";


function MovieDetails() {
    let { id } = useParams();

    return (
        <div>
            <p>Movie details for movie with id: {id}!</p>
            <p>TODO TODO TODO TODO</p>
        </div>
    );
}

export default MovieDetails;