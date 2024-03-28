import ListItem from '@mui/material/ListItem';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
/*
Function for displaying a movie item.
 */
function MovieItem({movie}) {
    const ext = '.jpg';
    const source = `/img/${movie.image_id}${ext}`;

    return (
        <ListItem
            alignItems='flex-start'
            key={movie.id}>
            <ListItemButton onClick={(event) => {alert('clicked');}}>
                <ListItemAvatar>
                    <Avatar src={source}/>
                </ListItemAvatar>
                <ListItemText primary={movie.title} secondary={movie.release_year}/>
            </ListItemButton>
        </ListItem>
    );
}

export default MovieItem;