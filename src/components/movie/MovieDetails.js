import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, Grid, Input, InputLabel, styled} from "@mui/material";
import {Cloud, Send} from "@mui/icons-material";
import {useEffect, useState} from "react";
import ImageComponent from "../custom/ImageComponent";
import DataManager from "../data/DataManager";

function MovieDetails() {
    //Might use this later for checking or something.
    const {id} = useParams();
    const navigate = useNavigate();

    //Set data of movie into this state object if available.
    const [movieState, setMovieState] = useState({
        id: '',
        title: '',
        release_year: '',
        image_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            // Using our custom DataManager here to keep fetching logic in one place.
            const moviesData = await DataManager.fetchMovies();
            const movie = DataManager.getMovie(moviesData, id);
            setMovieState(movie);
        }
        // debugger;
        fetchData();
    }, [id]); // This effect needs to be triggered whenever the movie id param changes.

    const handleChangeInput = (event) => {
        //todo
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
                            <Input id="movie-title" type="text" value={movieState.title}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="release-year" shrink>Release year</InputLabel>
                            <Input id="release-year" type="text" value={movieState.release_year}/>
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
                            <Button variant="contained" endIcon={<Send/>}>
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