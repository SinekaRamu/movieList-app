// create the Array that holds objects, movies list

let favMovies = [
  {
    id: "1694429388189",
    title: "Luck",
    releaseDate: "2022",
  },
  {
    id: "1694429446495",
    title: "Ratatouille",
    releaseDate: "2007",
  },
  {
    id: "1694429468159",
    title: "Tom and Jerry",
    releaseDate: "2021",
  },
  {
    id: "1694429552349",
    title: "Garfield",
    releaseDate: "2004",
  },
  {
    id: "1694429606142",
    title: "Stuart Little",
    releaseDate: "1999",
  },
  {
    id: "1694429617086",
    title: "Narnia 1",
    releaseDate: "2005",
  },
  {
    id: "1694429627679",
    title: "Narnia 2",
    releaseDate: "2008",
  },
  {
    id: "1694429639358",
    title: "Narnia 3",
    releaseDate: "2010",
  },
  {
    id: "1694429655838",
    title: "Encanto",
    releaseDate: "2021",
  },
  {
    id: "1694429668222",
    title: "Moana",
    releaseDate: "2016",
  },
];

function cardMovieDiv(movie) {
  //movie Card div
  const div = document.createElement("div");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  //adding class attribute to div
  div.setAttribute("class", "movie-card");
  div2.setAttribute("class", "imageBox");

  //adding id attribute to div
  const id = `movie-${movie["id"]}`;
  div.setAttribute("id", id);

  // creating img element
  const img = document.createElement("img"); //title

  //Content of the Movie Card
  const h2 = document.createElement("h2"); //title
  h2.innerText = movie["title"];

  const h3 = document.createElement("h3"); //realease date
  h3.innerText = movie["releaseDate"];

  div.appendChild(div1);
  div.appendChild(div2);
  div1.appendChild(h2);
  div1.appendChild(h3);
  div2.appendChild(img);

  //adding button element
  const newButton = document.createElement("button"); //delete button
  newButton.textContent = "delete";
  div1.appendChild(newButton);

  // To delete the division
  newButton.addEventListener("click", function () {
    div.remove();
  });

  return div;
}

function appendToApp(movieDiv) {
  const app = document.querySelector("#app-grid");
  app.appendChild(movieDiv);
}

for (let i = 0; i < favMovies.length; i++) {
  const movieDiv = cardMovieDiv(favMovies[i]);
  appendToApp(movieDiv);
}
