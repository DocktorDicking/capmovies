import ListItem from '@mui/material/ListItem';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {useAllCapsHook} from "../custom/hook/useAllCapsHook";
/*
Function for displaying a movie item.
 */
function MovieItem({movie}) {
    const ext = '.jpg';
    const source = `/img/${movie.image_id}${ext}`;
    const navigate = useNavigate(); //react-router-dom hook we can use for navigation functionality.

    //Add the clicked item to the state of the navigate so we can retrieve it after navigating.
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
                <ListItemText primary={useAllCapsHook(movie.title)} secondary={movie.release_year}/>
            </ListItemButton>
        </ListItem>
    );
}

export default MovieItem;