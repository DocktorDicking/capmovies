import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/material";


function IntroductionPage() {
    return (
        <Box>
            <Typography paragraph>
                Welcome to this landing page for this application.
                This page will be shown when the route is equal to '/' or just the root url.
                <br/>
                Click on the movies in the list to the left to view the movie details. This page will be
                replaced with the movie details page.
            </Typography>
        </Box>
    );
}

export default IntroductionPage;