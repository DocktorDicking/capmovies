import MovieList from "../movie/MovieList";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from "react";

/**
 * Will be responsible for routing and data fetching.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function RouterComponent() {
    const [allMovies, setMovies] = useState([]);

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

    return (
        <Router>
            <Routes>
                <Route path="/movie/:id" element={<div><p>TODO</p></div>}/>
                <Route path="/" element={<MovieList allMovies={allMovies}/>}/>
            </Routes>
        </Router>
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

TODO: Assignment 02:

Implement search functionality. Seach should allow users to search for movies based on their title or release year.
Result should be displayed in real-time while the user is typing.

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
