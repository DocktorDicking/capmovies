import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, FormControl, Grid, Input, InputLabel, styled} from "@mui/material";
import {Cloud, Image, Send} from "@mui/icons-material";

function MovieDetails() {
    let {id} = useParams();
    const navigate = useNavigate();

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
                        <Image style={{width: '100%', height: '300px'}}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Button
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
                            <InputLabel htmlFor="movie-title">Movie title</InputLabel>
                            <Input id="movie-title" type="text"/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="release-year">Release year</InputLabel>
                            <Input id="release-year" type="text"/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
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