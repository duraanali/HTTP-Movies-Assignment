import React, { useState, useEffect } from "react";
import axios from "axios";


const UpdateMovie = props => {
    const [movies, setMovies] = useState({ title: "", director: "", metascore: "" });

    useEffect(() => {
        const id = props.match.params.id;
        const itemInArr = props.movies.find(movie => `${movie.id}` === id);
        if (itemInArr) setMovies(itemInArr);
    }, [props.movies, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        setMovies({
            ...movies,
            [ev.target.name]: value
        });
    };



    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movies)
            .then(res => {
                props.history.push('/');
                setMovies({ title: "", director: "", metascore: "" });
                props.updatemovies(res.data);

            })
            .catch(err => console.log(err.response));
    };

    return (
        <div>

            <div className="save-wrapper">
                <div className="quotes-form">
                    <h2>Update movies</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            onChange={changeHandler}
                            value={movies.title}
                        />
                        <input
                            type="text"
                            name="director"
                            placeholder="director"
                            onChange={changeHandler}
                            value={movies.director}
                        />
                        <input
                            type="text"
                            name="metascore"
                            placeholder="metascore"
                            onChange={changeHandler}
                            value={movies.metascore}
                        />

                        <button className="quotes-btn" type="submit">
                            Update Movie
          </button>
                    </form>
                </div>


            </div>
        </div>

    );
}

export default UpdateMovie;