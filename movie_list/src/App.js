//Main Movie Display
import './App.css';
import React, { useState, useEffect, useContext } from "react";
//Forms
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Main Movie Display
function App() {
  const [movies, setMoviesData] = useState([]);
  const [query, setQuery] = useState('');
  const getFilteredMovies = (query, movies) => {
    if (!query) {
      return movies;
    }
    return movies.filter(movies => movies.name.includes(query))
  }


useEffect(() => {
  fetch('http://localhost:8081/movies')
  .then((response) => response.json())
  .then((data) => {
    setMoviesData(data)
      console.log("initialfetch:", data)
    })
  }, [])
  
  console.log("movies are showing", movies)
  const filteredMovies = getFilteredMovies(query, movies);

//Forms
const [name, setName] = useState("");
const [id, setId] = useState("")
const [message, setMessage] = useState("");

let handleSubmit = async (e) => {
  // e.preventDefault(); //stops auto refresh after submit
  try {
    const body = {
      name: e.target[0].value,
    }
    console.log("body", body)
    let res = await fetch("http://localhost:8081/movies", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target[0].value,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setName("");
      setMessage("User created successfully");
    } else {
      setMessage("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};

//delete

const handleDeleteClick = async (e) => {
  console.log(e.currentTarget.id)
  // id.preventDefault();
  let res = await fetch(`http://localhost:8081/members/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (res.status === 200) {
    setMessage("Movie Deleted");
  } else {
    setMessage("Some error occured");
  }
}

//Main Movie Display
  return (
    <>
    <div className="App">
      <h1>Movies</h1>
      <label>search</label>
      <input type="text" onChange={(e => setQuery(e.target.value))}></input>
      <ul>
        {filteredMovies.map(value => <h1 key={value.name}>{value.name}
        </h1>)}
      </ul>
      {movies.map((movies, index) => {
       return (
        <div key={index}>
        {/* <br></br> */}
        <button onClick={handleDeleteClick}
          >Delete</button>
       <br></br>
       </div>
       )
      })}
    </div>
    {/* Forms */}
    <div className="Add">
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>name</Form.Label>
        <Form.Control type="name" placeholder="Add Movie" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group> */}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">Add Movie</Button>
    </Form>
      <div className="Add">{message ? <p>{message}</p> : null}</div>
    </div>
  </>
  );
}

export default App;
