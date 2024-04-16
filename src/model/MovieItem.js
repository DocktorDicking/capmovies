import ListItem from '@mui/material/ListItem';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import { useNavigate } from 'react-router-dom';
/*
Function for displaying a movie item.
 */
function MovieItem({movie}) {
    const ext = '.jpg';
    const source = `/img/${movie.image_id}${ext}`;
    const navigate = useNavigate(); //react-router-dom hook we can use for navigation functionality.

    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <ListItem
            alignItems='flex-start'
            key={movie.id}>
            <ListItemButton onClick={() => handleClick(movie.id)}>
                <ListItemAvatar>
                    <Avatar src={source}/>
                </ListItemAvatar>
                <ListItemText primary={movie.title} secondary={movie.release_year}/>
            </ListItemButton>
        </ListItem>
    );
}

export default MovieItem;