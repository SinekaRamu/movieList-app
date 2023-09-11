// create the Array that holds objects, movies list

let favMovies = [
  {
    title: "Luck",
    releaseDate: "2022",
  },
  {
    title: "Ratatouille",
    releaseDate: "2007",
  },
  {
    title: "Tom and Jerry",
    releaseDate: "2007",
  },
];

function moviediv() {}

for (let i; i < favMovies.length; i++) {
  const movie = `${favMovies[i]["title"]}` - +`${favMovies[i]["releaseDate"]}`;
  console.log(movie);
}
