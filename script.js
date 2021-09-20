"use strict";

// Record user ingredient selection(s) and store them in a variable.
// Based on the user selection, pull a random salad recipe from API call which matches some or all of the selected ingredients.
//    - Display the salad title, image, summary and link to the recipe on the page.
// Add error handling if a user does not select anything from ingredient list or if there are not matching recipes based on user selection.
// Add a reset function which will clear the page and allow the user to select new ingredients.

// Setup namespace object
const saladApp = {};

// Declare url and API key as properties on the namespace object
saladApp.apiUrl = "https://api.spoonacular.com/recipes/complexSearch";
saladApp.apiKey = "045af448730b4c4080d271496d8b95bc";

// Get recipe data from the API
saladApp.getRecipes = () => {
  const url = new URL(saladApp.apiUrl);
  url.search = new URLSearchParams({
    apiKey: saladApp.apiKey,
    query: "salad",
    instructionsRequired: true,
    addRecipeInformation: true,
    addRecipeNutrition: true,
  });

  // Fetch request
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      const saladObjects = jsonResponse.results;
      console.log(saladObjects);
    });
};

saladApp.userSelection = () => {
  const ingredientSelectionForm = document.querySelector("form");
  ingredientSelectionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Submitted!");

    const greens = document.querySelector("input[name=greens]:checked").value;
    const protein = document.querySelector("input[name=protein]:checked").value;
    const garnish = document.querySelector("input[name=garnish]:checked").value;
    const dressing = document.querySelector(
      "input[name=dressing]:checked"
    ).value;
    let fruitsAndVeggies = document.querySelectorAll(
      "input[name=fruitsAndVeggies]:checked"
    );
    fruitsAndVeggies.forEach((ingredient) => {
      console.log(ingredient.value);
    });
    console.log(greens, protein, garnish, dressing);
  });
};

// Added our init method
saladApp.init = () => {
  saladApp.getRecipes();
  saladApp.userSelection();
};

// Initialized our init method
saladApp.init();
