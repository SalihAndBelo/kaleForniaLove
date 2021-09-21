"use strict";
// GENERAL APP GOALS,

// Record user ingredient selection(s) and store them in a variable.
// Based on the user selection, pull a random salad recipe from API call which matches some or all of the selected ingredients.
//    - Display the salad title, image, summary and link to the recipe on the page.
// Add error handling if a user does not select anything from ingredient list or if there are not matching recipes based on user selection.
// Add a reset function which will clear the page and allow the user to select new ingredients.

// Namespace object
const app = {};

// Namespace object properties
app.apiUrl = "https://api.edamam.com/api/recipes/v2";
app.appKey = "b6093d9d19dda2ef504a3b36f99113b1";
app.appId = "560f8d94";
app.ingredientForm = document.querySelector("form");
app.ingredients = document.querySelectorAll("input[name=ingredient]:checked");

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
      app.displaySelection(data.hits);
      console.log(data.hits);
    });
};

// Display salad selection to the page
app.displaySelection = (saladRecipes) => {
  saladRecipes.forEach((salad) => {
    console.log(salad);
  });
};

// Get user selection and pass it as an argument to the q param
app.userSelection = () => {
  app.ingredientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let ingredientArray = [...app.ingredients].map((ingredient) => {
      return ingredient.value;
    });
    console.log(ingredientArray);

    let userSelectedIngredients = ingredientArray.toString();
    console.log(userSelectedIngredients);

    app.getRecipes(userSelectedIngredients);
  });
};

// Added our init method and passed all functions that need to be called inside of it
app.init = () => {
  app.userSelection();
};

// Initialized our init method
app.init();
