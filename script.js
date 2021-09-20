"use strict";

// Record user ingredient selection(s) and store them in a variable.
// Based on the user selection, pull a random salad recipe from API call which matches some or all of the selected ingredients.
//    - Display the salad title, image, summary and link to the recipe on the page.
// Add error handling if a user does not select anything from ingredient list or if there are not matching recipes based on user selection.
// Add a reset function which will clear the page and allow the user to select new ingredients.

// Setup namespace object
const saladApp = {};

// Declare url and API key as properties on the namespace object
saladApp.apiUrl = "https://api.edamam.com/api/recipes/v2";
saladApp.app_key = "b6093d9d19dda2ef504a3b36f99113b1";
saladApp.app_id = "560f8d94";

// Get recipe data from the API
saladApp.getRecipes = () => {
  const url = new URL(saladApp.apiUrl);
  url.search = new URLSearchParams({
    app_key: saladApp.app_key,
    app_id: saladApp.app_id,
    q: "salad",
    dishType: "salad",
    type: "public",
  });

  // Fetch request
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      const saladObjects = jsonResponse.hits;
      console.log(saladObjects);
    });
};

saladApp.userSelection = () => {
  const ingredientSelectionForm = document.querySelector("form");
  ingredientSelectionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Submitted!");

    let ingredients = document.querySelectorAll(
      "input[name=ingredient]:checked"
    );

    ingredients.forEach((item) => {
      let itemValue = item.value;
      console.log(itemValue);
    });
  });
};

// Added our init method
saladApp.init = () => {
  saladApp.getRecipes();
  saladApp.userSelection();
};

// Initialized our init method
saladApp.init();
