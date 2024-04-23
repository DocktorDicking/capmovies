import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, Grid, Input, InputLabel, styled} from "@mui/material";
import {Cloud, Image, Send} from "@mui/icons-material";
import {useEffect, useState} from "react";

function MovieDetails() {
    //Might use this later for checking or something.
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    //Set data of movie into this state object if available.
    const [movieState, setMovieState] = useState({
        id: '',
        title: '',
        release_year: '',
        image_id: ''
    });

    //Makes sure the useState object is updated when the value of the location.state.movie changes.
    useEffect(() => {
        if (location.state && location.state.movie) {
            setMovieState(location.state.movie);
        } else {
            setMovieState({id: '', title: '', release_year: '', image_id: ''});
        }
    }, [location.state]);

    console.log(movieState);

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

    console.log(`/img/${movieState.image_id}.jpg`);

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
                        {/*TODO: seems like this Image is not updated after render or something? Gotta check if the path is correct. */}
                        {/*<Image style={{width: '100%', height: '300px'}} src={`/img/${movieState.image_id}.jpg`}/>*/}
                        <Box
                            component="img"
                            sx={{
                                display: 'fles',
                                justifyContent: 'center',
                                maxWidth: "100%",
                                maxHeight: 450,
                                height: "auto",
                                width: "auto",
                                objectFit: "contain",
                                m: "auto"
                            }}
                            src={`/img/${movieState.image_id}.jpg`}
                        />
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
                                Send
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default MovieDetails;