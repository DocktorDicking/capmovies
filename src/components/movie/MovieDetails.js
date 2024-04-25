import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, Grid, Input, InputLabel, styled} from "@mui/material";
import {Cloud, Send} from "@mui/icons-material";
import {useEffect, useState} from "react";
import ImageComponent from "../custom/ImageComponent";
import DataManager from "../data/DataManager";

/**
 * Component responsible for displaying details of a selected Movie and to handle changes/new movies added to the dataset.
 * This component gets a state hook function passed in its parameter that is used to trigger a useEffect in another component.
 * @param setMoviesChanged
 * @return {JSX.Element}
 * @constructor
 */
function MovieDetails({setMoviesChanged}) {
    //Might use this later for checking or something.
    const {id} = useParams();
    const navigate = useNavigate();
    let initialMovieState = {id: '', title: '', release_year: '', image_id: ''};

    //Set data of movie into this state object if available.
    const [movieState, setMovieState] = useState(initialMovieState);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                // Since the movies data is already in localStorage we can just get the movie. See DataManager.js.
                let movie = DataManager.getMovie(id);
                setMovieState(movie);
            } else {
                setMovieState(initialMovieState);
            }
        }
        // debugger;
        fetchData();
    }, [id]); // This effect needs to be triggered whenever the movie id param changes.

    /*
    This method handles all changes made to the current movie object.
    ...movieState clones the current movie in the state (object) as a new movie object.
    [event.target.name]: even.target.value will set the values on the new object that is changed by the user in the
    input fields. [event.target.name] references the "name" property on the JSX element and 'event.target.value'
    points to the current value in the input field.

    This method will be triggered by every key/change made to the input field.
     */
    const handleInputChange = (event) => {
        setMovieState({
            ...movieState, [event.target.name]: event.target.value
        });
    };

    /*
    This method will be called whenever a user clicks the 'Save' button.
    The method calls the DataManager and will try to save the given movieState to localStorage.
    Finally setMovieChanged() will be set to true to signal the MovieList component that the dataset haves been changed
    which will result in the list being refreshed.

    The method 'setMoviesChanged' is passed along from the RouterComponent (where the MovieList lives) and can be seen
    as a prop at the top of this file 'function MovieDetails({setMoviesChanged})'. Because the state variable 'moviesChanged'
    is in the deps array of the useEffect in the MovieList component it will trigger the useEffect to be run again.
     */
    const handleSaveClick = () => {
        if (DataManager.saveMovie(movieState)) {
            setMoviesChanged(true);
        }
    };

    // Applying custom style to an <Input/> so we can use it "hidden" within a button.
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    //TODO: Add keys to input fields and styling.
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', // Centralize vertically
                height: '100vh', // Full viewport height
                bgcolor: 'background.default', // Background color of the page
            }}
            noValidate
            autoComplete="off"
        >
            <Box
                sx={{
                    width: '80%', // Used width
                    maxWidth: '800px', // Maximum width to maintain responsiveness
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // Gap between child elements
                    padding: 2,
                    border: '1px solid #ddd', // Border
                    borderRadius: 2, // Border radius
                    boxShadow: 1, // Box-shadow for card like effect
                    bgcolor: 'background.paper', // Background-color
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ImageComponent imgState={movieState}/>

                        {/*<Box*/}
                        {/*    component="img"*/}
                        {/*    sx={{*/}
                        {/*        display: 'flex',*/}
                        {/*        justifyContent: 'center',*/}
                        {/*        maxWidth: "100%",*/}
                        {/*        maxHeight: 450,*/}
                        {/*        height: "auto",*/}
                        {/*        width: "auto",*/}
                        {/*        objectFit: "contain",*/}
                        {/*        m: "auto"*/}
                        {/*    }}*/}
                        {/*    src={`/img/${movieState.image_id}.jpg`}*/}
                        {/*/>*/}
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Button
                                disabled={true}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<Cloud/>}
                            >
                                Upload image
                                <VisuallyHiddenInput type="file"/>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="movie-title" shrink>Movie title</InputLabel>
                            <Input id="movie-title" name="title" type="text" value={movieState.title} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="release-year" shrink>Release year</InputLabel>
                            <Input id="release-year" name="release_year" type="text" value={movieState.release_year} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: 2,
                                gap: 2
                            }}
                        >
                            <Button onClick={() => navigate('/')}>
                                Cancel
                            </Button>
                            <Button variant="contained" endIcon={<Send/>} onClick={handleSaveClick}>
                                {movieState.id ? 'Save' : 'Create'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default MovieDetails;