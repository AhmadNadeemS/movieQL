// const { createServer } = require("@graphql-yoga/node");
import { createServer } from "graphql-yoga";
import { getMovies } from "./graphql/db.js";
// import { people } from "./graphql/db";
// const { people } = require("./graphql/db");
// people
// Provide your schema

const nicolas = {
  name: "Nicolas",
  age: 18,
  gender: "female",
};
const people = [
  {
    id: "0",
    name: "Nicolas",
    age: 18,
    gender: "female",
  },
  {
    id: 1,
    name: "Jisu",
    age: 18,
    gender: "female",
  },
  {
    id: 2,
    name: "Japan Guy",
    age: 18,
    gender: "male",
  },
  {
    id: 3,
    name: "Daal",
    age: 18,
    gender: "male",
  },
  {
    id: 4,
    name: "JD",
    age: 18,
    gender: "male",
  },
  {
    id: 5,
    name: "moondaddi",
    age: 18,
    gender: "male",
  },
  {
    id: 6,
    name: "flynn",
    age: 18,
    gender: "male",
  },
];

let movies = [
  {
    id: 0,
    name: "Star Wars",
    score: 8,
  },
  {
    id: 1,
    name: "Star Wars 1",
    score: 9,
  },
  {
    id: 2,
    name: "Star Wars 2",
    score: 10,
  },
];

// export const getMovies = () => movies;
export const getById = (id) => {
  // const filteredPeople = people.filter((person) => people.id === id);
  const filteredPeople = people.filter((person) => person.id === id);
  return filteredPeople[0];
};

export const deleteMovie = (id) => {
  //   const cleanedMovies = movies.filter((movie) => movie.id !== String(id));
  const cleanedMovies = movies.filter((movie) => id != movie.id);
  console.log(cleanedMovies);
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
};
export const addMovie = (name, score) => {
  const newMovie = {
    id: movies.length + 1,
    name,
    score,
  };
  movies.push(newMovie);
  return newMovie;
};

const server = createServer({
  //   schema: {
  //     typeDefs: `
  //       type Query {
  //         ping: String
  //       }
  //     `,
  //     resolvers: {
  //       Query: {
  //         ping: () => "pong",
  //       },
  //     },
  //   },
  schema: {
    typeDefs: `
          type Person {
           id: Int!
           name: String!
            age: Int!
          gender: String!
         }
          type Movie {
           id: Int!
            title: String!
            rating: Float!
            summary: String!
            language:String!
            medium_cover_image:String!
         }
         type Mutation{
             addMovie(name:String!,score:Int!): Movie
             deleteMovie(id: Int!): Boolean!
         }
          type Query{
              people: [Person]!
              person(id:Int):Person
              movies(limit:Int!,rating:Float!):[Movie]!
              movie(id:Int):Movie
          }
      `,
    resolvers: {
      Query: {
        // people: () => people,
        // person: (_, { id }) => getById(id),
        movies: (_, { limit, rating }) => getMovies(limit, rating),
        // movie: (_, { id }) => getById(id),
      },
      //   Mutation: {
      //     addMovie: (_, { name, score }) => addMovie(name, score),
      //     deleteMovie: (_, { id }) => deleteMovie(id),
      //   },
    },
  },
  //   schema: {
  //     typeDefs: `
  //             type Nicolas {
  //   name: String!
  //   age: Int!
  //   gender: String!
  // }
  //             type Query {
  //   person: Nicolas!
  // }
  //         `,
  //     resolvers: {
  //       Query: {
  //         person: () => nicolas,
  //       },
  //     },
  //   },
});

// Start the server and explore http://localhost:4000/graphql
server.start();
