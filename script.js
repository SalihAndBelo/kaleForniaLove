"use strict";
// GENERAL APP GOALS,

// Record user ingredient selection(s) and store them in a variable.
// Based on the user selection, pull recipes from the API call which matches the selected ingredients.
//    - Display the salad title, cuisine type, image, and link to the recipe on the page.
// Add error handling if a user does not select anything from ingredient list or if there are not matching recipes based on user selection.

// Namespace object
const app = {};

// Namespace variables
app.apiUrl = "https://api.edamam.com/api/recipes/v2";
app.appKey = "b6093d9d19dda2ef504a3b36f99113b1";
app.appId = "560f8d94";
app.saladResults = document.querySelector("#saladCombo");

// Get recipe data from the API
app.getRecipes = (userInput) => {
  const url = new URL(app.apiUrl);
  url.search = new URLSearchParams({
    app_key: app.appKey,
    app_id: app.appId,
    q: `${userInput} salad`,
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
        app.saladResults.classList.remove("saladCombo");
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
      title.textContent = salad.recipe.label;

      const cuisineType = document.createElement("h3");
      cuisineType.innerHTML = `Cuisine Type: <span>${salad.recipe.cuisineType[0]}</span>`;

      const image = document.createElement("img");
      image.src = salad.recipe.image;
      image.alt = salad.recipe.label;

      const recipeLink = document.createElement("p");
      recipeLink.innerHTML = `<a href="${salad.recipe.url}">Click here to try this delicious recipe!</a>
`;
      const saladRecommendations = document.createElement("div");
      saladRecommendations.classList.add("recipeResults");

      const resultImageDiv = document.createElement("div");

      saladRecommendations.append(title);
      saladRecommendations.append(cuisineType);
      saladRecommendations.append(resultImageDiv);
      saladRecommendations.append(recipeLink);
      resultImageDiv.append(image);

      app.saladResults.classList.add("saladCombo");
      app.saladResults.append(saladRecommendations);
      app.saladResults.scrollIntoView();
    });
  }
  // Error handler -> if there are no results, display error message on the page
  else {
    app.saladResults.classList.remove("saladCombo");

    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<div class ="errorImage"><img src="./assets/chef-safi.png" alt="Handsome devil named Safi"></div>`;

    const errorParagraph = document.createElement("p");
    errorParagraph.classList.add("errorMessage");
    errorParagraph.innerHTML = `Chef de Partie doesn't approve of this! Please select a different set of ingredients from above and try again.`;

    imgDiv.append(errorParagraph);

    app.saladResults.append(imgDiv);
    app.saladResults.scrollIntoView();
  }
};

// Get user selection and pass it as an argument to the q param
app.userSelection = () => {
  app.ingredientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Select all the checked checkboxes
    const ingredients = document.querySelectorAll("input[name=ingredient]:checked");

    // Iterate each node list object and return the value of the checkbox into an array
    const ingredientArray = [...ingredients].map((ingredient) => {
      return ingredient.value;
    });

    // Convert array of values into a string
    const userSelectedIngredients = ingredientArray.toString();

    // Pass the values as an argument to the API call
    app.getRecipes(userSelectedIngredients);
  });
};

// Added init method and passed all functions that need to be called inside of it
app.init = () => {
  app.ingredientForm = document.querySelector("form");
  app.ingredientForm.reset();
  app.userSelection();
};

// Initialized init method
app.init();
