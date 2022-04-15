import axios from "axios";
import fetch from "node-fetch";

const API_URL = "https://yts.torrentbay.to/api/v2/list_movies.json?";

export const getMovies = (limit, rating) => {
  let REQUEST_URL = API_URL;
  if (limit > 0) {
    REQUEST_URL += `limit=${limit}&`;
  }
  if (rating > 0) {
    REQUEST_URL += `minimum_rating=${rating}`;
  }
  return fetch(`${REQUEST_URL}`)
    .then((res) => res.json())
    .then((data) => data.data.movies);
  //   const {
  //     data: {
  //       data: { movies },
  //     },
  //   } = await axios(`${REQUEST_URL}`);
  //   console.log(movies);
  //   return movies;
};
