import { useState } from 'react';
import './styles.css';
import Movie from './components/Movie/Movie.js';
import Form from './components/Form/Form.js';
import { uid } from 'uid';

const initialMovieData = [
  {
    id: '28djdh72',
    name: 'The Incredible Hulk',
    isLiked: false,
  },
  {
    id: 'dknseu2',
    name: 'Spiderman 1-25',
    isLiked: false,
  },
  {
    id: 'dkwi02ksk',
    name: 'Lord of the Rings',
    isLiked: true,
  },
];

export default function App() {
  //      ⤵️  [ alle bisherigen movies, {  }]
  const [movies, setMovies] = useState(initialMovieData);

  console.log('state: movies:', movies);

  // 1. add a movie ✅ -- create -- C
  function handleAddMovie(newMovie) {
    setMovies([{ id: uid(), ...newMovie }, ...movies]);

    //console.log('the movie to add', newMovie);
  }

  // 2. delete a movie - ⚠️ filter() ✅ -- delete -- D
  function handleDeleteMovie(id) {
    const moviesToKeep = movies.filter((movie) => {
      return movie.id !== id;
    });

    setMovies(moviesToKeep);

    // console.log('movie to delete', id);
  }

  // 3. update a movie - toggle like / dislike ✅ -- update -- U
  function handleToggleLike(id) {
    setMovies(
      movies.map((movie) => {
        //
        return movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie;
      })
    );

    console.log('movie to toggle Like', id);
  }

  return (
    <div className="app">
      <h1>Favorite Movies</h1>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Movie
              handleToggleLike={handleToggleLike}
              handleDeleteMovie={handleDeleteMovie}
              name={movie.name}
              isLiked={movie.isLiked}
              id={movie.id}
            />
          </li>
        ))}
      </ul>
      <Form handleAddMovie={handleAddMovie} />
    </div>
  );
}
