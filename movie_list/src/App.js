import './App.css';
import React, { useState, useEffect, useContext } from "react";

function App() {
  const [movies, setMoviesData] = useState([]);
  const [query, setQuery] = useState('');
  // const filteredItems = getFilteredItems(query, items);
  // const getFilteredMovies = (query, name) => {
  //   if (!query) {
  //     return name;
  //   }
  //   return name.filter{movies => movies.name.includes{query}}
  // }


useEffect(() => {
  fetch('http://localhost:8081/movies')
  .then((response) => response.json())
  .then((data) => {
    setMoviesData(data)
      console.log("initialfetch:", data)
    })
  }, [])
  
  console.log("movies are showing", movies)
  return (
    <div className="App">
      <h1>Movies</h1>
      <label>search</label>
      <input type="text" onChange={(e => setQuery(e.target.value))}></input>
      <br></br>
      {movies.map((movies, index) => {
       return (
        <div key={index}>
        <br></br>
        <div>Name: {movies.name}</div>
       <br></br>
       </div>
       )
      })}
    </div>
  );
}

export default App;