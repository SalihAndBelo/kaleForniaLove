"use strict";
// GENERAL APP GOALS,

// Record user ingredient selection(s) and store them in a variable.
// Based on the user selection, pull a random salad recipe from API call which matches some or all of the selected ingredients.
//    - Display the salad title, image, and link to the recipe on the page.
// Add error handling if a user does not select anything from ingredient list or if there are not matching recipes based on user selection.
// Add a reset function which will clear the page and allow the user to select new ingredients.

// Namespace object
const app = {};

// Namespace variables
app.apiUrl = "https://api.edamam.com/api/recipes/v2";
app.appKey = "b6093d9d19dda2ef504a3b36f99113b1";
app.appId = "560f8d94";

// Get recipe data from the API
app.getRecipes = (userInput) => {
  const url = new URL(app.apiUrl);
  url.search = new URLSearchParams({
    app_key: app.appKey,
    app_id: app.appId,
    q: userInput,
    dishType: "salad",
    type: "public",
  });
  // Fetch request
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Error handler -> if user does not select any ingredients
      document.querySelector("#saladCombo").innerHTML = "";
      if (userInput === "") {
        alert("Please select some ingredients!");
      } else {
        app.displaySelection(data.hits);
      }
    });
};

// Display salad selection to the page
app.displaySelection = (saladRecipes) => {
  if (saladRecipes.length > 0) {
    saladRecipes.forEach((salad) => {
      const title = document.createElement("h2");
      title.innerText = salad.recipe.label;

      const cuisineType = document.createElement("h3");
      cuisineType.innerHTML = `Cuisine Type: <span>${salad.recipe.cuisineType[0]}</span>`;

      const image = document.createElement("img");
      image.src = salad.recipe.image;
      image.alt = salad.recipe.label;

      const recipeLink = document.createElement("p");
      recipeLink.innerHTML = `<a href="${salad.recipe.url}">Click here to try this delicious recipe!</a>
`;

      const saladRecommendations = document.createElement("div");

      saladRecommendations.append(title);
      saladRecommendations.append(cuisineType);
      saladRecommendations.append(image);
      saladRecommendations.append(recipeLink);

      document.querySelector("#saladCombo").append(saladRecommendations);
    });
  }
  // Error handler -> if there are no results, display error message on the page
  else {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<div class ="errorImage"><img src="./assets/error.png" alt="A handsome devil named Safi"></div>`;

    document.querySelector("#saladCombo").append(imgDiv);
  }

  // Toggle label colors on click to notify the user a selection has been made
  app.changeLabelColor = () => {
    app.labels = document.querySelectorAll("label");
    app.labels.forEach((label) => {
      label.addEventListener(`click`, function () {
        label.classList.toggle("labelColor");
      });
    });
  };
};

// Toggle label colors on click to notify the user a selection has been made
app.changeLabelColor = () => {
  app.labels = document.querySelectorAll("label");
  app.labels.forEach((label) => {
    label.addEventListener(`click`, function () {
      label.classList.toggle("labelColor");
    });
  });
};

// Get user selection and pass it as an argument to the q param
app.userSelection = () => {
  app.ingredientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Select all the checked checkboxes
    const ingredients = document.querySelectorAll(
      "input[name=ingredient]:checked"
    );
    // Iterate each node list object and return the value of the checkbox into an array
    let ingredientArray = [...ingredients].map((ingredient) => {
      return ingredient.value;
    });

    // Convert array of values into a string
    let userSelectedIngredients = ingredientArray.toString();
    console.log(userSelectedIngredients);

    // Pass the values as an argument to the API call
    app.getRecipes(userSelectedIngredients);
  });
};

// Added our init method and passed all functions that need to be called inside of it
app.init = () => {
  app.ingredientForm = document.querySelector("form");
  app.ingredientForm.reset();
  app.userSelection();
  app.changeLabelColor();
};

// Initialized our init method
app.init();
