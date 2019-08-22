import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../index.css"
const initialmovie = {
    title: '',
    Director: '',
    Metascore: '',
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialmovie);

    useEffect(() => {
        const id = props.match.params.id;
        const movieInArr = props.movies.find(movie => `${movie.id}` === id);
        if (movieInArr) setMovie(movieInArr);
    }, [props.movies, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                setMovie(initialmovie);
                props.updatemovies(res.data);

            })
            .catch(err => console.log(err.response));
    };

    return (
        <div>
            <h2>Update movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="name"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="price"
                    onChange={changeHandler}
                    placeholder="Price"
                    value={movie.Director}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="imageUrl"
                    onChange={changeHandler}
                    placeholder="Image"
                    value={movie.Metascore}
                />


                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
