//Inialize the global vaiable
const app = document.querySelector("#app-grid");

// create the Array that holds objects, movies list
let favMovies = [];

//initial update
updateForm();
// updateMovieUI();
getFromLocalSorage();

//function to display UI
function updateMovieUI() {
  clearApp();
  for (let i = 0; i < favMovies.length; i++) {
    const movieDiv = cardMovieDiv(favMovies[i]);
    appendToApp(movieDiv);
  }
}

//function to append the html division
function appendToApp(movieDiv) {
  app.appendChild(movieDiv);
}

//function to clear the UI
function clearApp() {
  app.innerHTML = "";
}
// creating card for movie HTML tags
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

  //adding delete button element
  const dltBtn = document.createElement("button"); //delete button
  dltBtn.textContent = "delete";
  div1.appendChild(dltBtn);

  //adding Edit button element
  const editBtn = document.createElement("button"); //Edit button
  editBtn.textContent = "Edit";
  div1.appendChild(editBtn);

  // To delete the division
  dltBtn.addEventListener("click", function () {
    removeMovie(movie["id"]);
  });

  // To Edit the division
  editBtn.addEventListener("click", function () {
    editMovie(movie["id"]);
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

// Function to Edit movie
function editMovie(movieId) {
  console.log("edit", movieId);
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
    isEdit: false,
  };

  const status = document.querySelector("#status");
  if (!name) {
    status.innerText = "Enter Movie Name";
  } else if (!year) {
    status.innerText = "Enter release year";
  } else {
    status.innerText = " ";
    document.querySelector("#movie-form").reset();
    addMovie(movie);
  }
}

//function to add movie
function addMovie(movie) {
  favMovies.push(movie);
  updateMovieUI();
  setToLocalStorage();
}

// function to save data in local storage
function setToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("movie-list", str);
}

// Function to get data from localStorage
function getFromLocalSorage() {
  const str = localStorage.getItem("movie-list");
  if (!str) {
    favMovies = [];
  } else {
    favMovies = JSON.parse(str);
  }
  updateMovieUI();
}
