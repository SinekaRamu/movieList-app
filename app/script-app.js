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
    removeMovie(movie["id"]);
  });

  return div;
}

//Function to remove movie
function removeMovie(movieId) {
  // const filterArrray = favMovies.filter(function(movie){
  //   return movie.id != movieId
  // })
  const filterArrray = favMovies.filter((movie) => movie.id != movieId);
  favMovies = filterArrray;
  updateMovieUI();
}

//function to append the html division
function appendToApp(movieDiv) {
  const app = document.querySelector("#app-grid");
  app.appendChild(movieDiv);
}

//function to clear the UI
function clearApp() {
  const app = document.querySelector("#app-grid");
  app.innerHTML = "";
}
//function to display UI
function updateMovieUI() {
  clearApp();
  for (let i = 0; i < favMovies.length; i++) {
    const movieDiv = cardMovieDiv(favMovies[i]);
    appendToApp(movieDiv);
  }
}

//function to add form data
function updateForm() {
  const form = document.querySelector("#movie-form");
  form.addEventListener("submit", function (r) {
    r.preventDefault();

    // fetch form data
    const name = document.querySelector("#movieName").value;
    const year = document.querySelector("#movieYear").value;

    createMovieId(name, year);
  });
}

//function to add moive elements
function createMovieId(name, year) {
  const movie = {
    id: new Date().getTime(),
    title: name,
    releaseDate: year,
  };

  const status = document.querySelector("#status");
  if (!year) {
    status.innerHTML = "enter value";
  } else {
    addMovie(movie);
  }
}
//function to add movie
function addMovie(movie) {
  favMovies.push(movie);
  updateMovieUI();
}

//initial update
updateMovieUI();
updateForm();
