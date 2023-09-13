//Inialize the global vaiable
const app = document.querySelector("#app-grid");

// create the Array that holds objects, movies list
let favMovies = [];

//initial update
updateForm();
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
  const eidtBox = document.createElement("div");

  //adding class attribute to div
  div.setAttribute("class", "movie-card");
  div2.setAttribute("class", "imageBox");
  eidtBox.setAttribute("class", "edit-box");

  //adding id attribute to div
  const id = `movie-${movie["id"]}`;
  div.setAttribute("id", id);

  if (movie.isEdit) {
    div1.style.display = "none";
    div2.style.display = "none";
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", `edit-${movie.id}-name`);
    nameInput.setAttribute("placeholder", "Enter movie name");
    nameInput.setAttribute("id", `edit-${movie.id}-name`);
    nameInput.setAttribute("value", movie.title);

    const yearInput = document.createElement("input");
    yearInput.setAttribute("type", "number");
    yearInput.setAttribute("name", `edit-${movie.id}-year`);
    yearInput.setAttribute("placeholder", "Enter movie year");
    yearInput.setAttribute("id", `edit-${movie.id}-year`);
    yearInput.setAttribute("value", movie.releaseDate);

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";

    updateBtn.addEventListener("click", function () {
      updatingMovie(movie.id);
    });

    eidtBox.appendChild(nameInput);
    eidtBox.appendChild(yearInput);
    eidtBox.appendChild(updateBtn);
  }
  // creating img element
  const img = document.createElement("img"); //title

  //Content of the Movie Card
  const h2 = document.createElement("h2"); //title
  h2.innerText = movie["title"];

  const h3 = document.createElement("h3"); //realease date
  h3.innerText = movie["releaseDate"];

  div.appendChild(div1); //.appendChild(div2).appendChild(eidtBox);
  div.appendChild(div2);
  div.appendChild(eidtBox);
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
  setToLocalStorage();
}

// Function to Edit movie
function editMovie(movieId) {
  const editIndex = favMovies.findIndex((movie) => movie.id == movieId);
  if (editIndex != -1) {
    favMovies[editIndex]["isEdit"] = true;
    updateMovieUI();
  }
}

//function to update the edited movie
function updatingMovie(movieId) {
  const newTitle = document.querySelector(`#edit-${movieId}-name`).value;
  const newYear = document.querySelector(`#edit-${movieId}-year`).value;

  const toUpdateIndex = favMovies.findIndex((m) => m.id == movieId);
  if (toUpdateIndex != -1) {
    favMovies[toUpdateIndex]["title"] = newTitle;
    favMovies[toUpdateIndex]["releaseDate"] = newYear;
    favMovies[toUpdateIndex]["isEdit"] = false;
    if (!newTitle || !newYear) {
      alert("Enter value");
    } else if (newYear < 1500 || newYear > 2023) {
      alert("enter valid data");
    } else {
      setToLocalStorage();
    }
  }
}
//function to add form data
function updateForm() {
  const form = document.querySelector("#movie-form");
  form.addEventListener("submit", function (r) {
    r.preventDefault();
    createMovieId();
  });
}

//function to add moive elements
function createMovieId() {
  // fetch form data
  const name = document.querySelector("#movieName").value;
  const year = document.querySelector("#movieYear").value;

  statusValidate(name, year);
}

//function to check the given data
function statusValidate(name, year) {
  const status = document.querySelector("#status");
  if (!name || !year) {
    status.innerText = "Enter data";
  } else if (year < 1500 || year > 2023) {
    status.innerText = "Enter valid year";
  } else {
    status.innerText = " ";
    document.querySelector("#movie-form").reset();
    const movie = {
      id: new Date().getTime(),
      title: name,
      releaseDate: year,
      isEdit: false,
    };
    addMovie(movie);
  }
}

//function to add movie
function addMovie(movie) {
  favMovies.push(movie);
  setToLocalStorage();
}

// function to save data in local storage
function setToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("movie-list", str);
  updateMovieUI();
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
