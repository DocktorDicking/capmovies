import MovieList from "../movie/MovieList";
import {Routes, Route, useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {Box, IconButton, InputAdornment, TextField} from '@mui/material';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IntroductionPage from "../pages/IntroductionPage";
import CssBaseline from "@mui/material/CssBaseline";
import {AddCircle, Clear, Home} from "@mui/icons-material";
import MovieDetails from "../movie/MovieDetails";

/**
 * Will be responsible for routing and data fetching.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function RouterComponent() {
    const [allMovies, setMovies] = useState([]); // Used when all movie data is fetched.
    const [searchMovieText, setSearchMovieText] = useState(""); // State used for searching the movielist.

    // Logic for filtering the list which will result in a filteredMovies array.
    const filteredMovies = searchMovieText
        ? allMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchMovieText.toLowerCase()) ||
            movie.release_year.toString().includes(searchMovieText)) : allMovies;

    const navigate = useNavigate();
    const drawerWidth = 350;

    /*
    Just using fetch() does not work and will result in an endless loop when using 'useState()'
    Without useState() the data will not be rendered to the page since the render will happen before the
    data is loaded.

    Hence the combination of useState() and useEffect(). React will pick this up internally and monitor the
    state object. When something changes, data is fetched, it will trigger a rerender.
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('movies.json');
            const data = await response.json();
            setMovies(data.movies);
        }
        fetchData();
    }, []);

    /*
    The ui is build up within the <Router> component.
    The Drawer component holds the MovieList component which will be displayed on the left-side of the screen.
    The actual routes are within a separate Box component which will be the right-side of the screen. By placing the
    routes inside this box we can change the content of the "ContentBox" based on the route.

    The content displayed within the box component will be replace by the triggered route, the route will inject
    the component that is associated with this route.
     */
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        <IconButton onClick={() => navigate('/')}>
                            <Home/>
                        </IconButton>
                        Cap Movies
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    {/*Swapped out the Autocomplete component with a simple TextField component since the Autocomplete had to much features*/}
                    <Box m={1}>
                        <TextField
                            label="Search Movie"
                            value={searchMovieText}
                            onChange={e => setSearchMovieText(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="large"
                                            onClick={() => setSearchMovieText('')}
                                        >
                                            <Clear/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box m={1}>
                        <IconButton onClick={() => navigate('/create')}>
                            <AddCircle/>
                        </IconButton>
                    </Box>

                </Toolbar>

                <Divider/>
                <MovieList allMovies={filteredMovies}/>
                <Divider/>
            </Drawer>
            <Toolbar/>

            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                <Routes>
                    <Route path="/movie/:id" element={<MovieDetails/>}/>
                    <Route path="/create" element={<MovieDetails/>}/>
                    <Route path="/" element={<IntroductionPage/>}/>
                </Routes>
            </Box>
        </Box>
    );
}

export default RouterComponent;


/*
TODO: Assignment 01:

* Create basic React application

Display a list of movies using the movies.json in the public folder.
* Create a movie model which holds: title, release year, cover img id.
* Create a movie list component which utilized the move model.
* load the movie.json in router.js
* Initialize the movie list component and feed the data to the component
* Handle the data in the movie list and let it create a movie model (in the list) for each movie in the JSON

Result:

Completed this assignment:
-Created the needed components for the List and Movie object.
-Installed MUI (Material UI) for the styling and templating.
-Created a basic UI with MUI by creating a "main UI" with a content box.
-Added the MovieList component to the UI inside the Drawer component.
-Data gets fetched from the json file in the public folder and is displayed in the list.

Take away:
Learned about MUI and how to use it. Basic React flow (States, Effects, Router, Function-Components, Class-Components)


TODO: Assignment 02:

Implement search functionality. Search should allow users to search for movies based on their title or release year.
Result should be displayed in real-time while the user is typing.

Completed this assignment:
-Added a TextField in the toolbar of the Drawer component.
-The input is checked in real-time and filters the MovieList on name or year.

Take Away:
Learned about <Autocomplete/> component and <TextField/> and when to use them.
Ran into rendering problems because of components relying on data that was nog there.
Refreshed basic knowledge on array mapping and filtering.

TODO: Assignment 03:

Create a simple form that allows users to add new movies to the list displayed.
The form should have fields for the movie title, release year and img.
After submitting the movie should be added to the list and be displayed.

TODO: Assignment 04:

Create a page that displays the details of a single movie when its title is clicked.
The movie details should include title, release year, cover image and a short description?

TODO: Assignment 05:

Create a custom hook in React that formats the movie title in a specific way.
The hook could format the title in all caps or title case.

 */
