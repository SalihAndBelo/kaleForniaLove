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
      document.querySelector('#saladCombo').innerHTML = '';
      console.log(data.hits);
      app.displaySelection(data.hits);
    });
};

// Display salad selection to the page
app.displaySelection = (saladRecipes) => {
  saladRecipes.forEach((salad) => {
    const title = document.createElement('h3');
    title.innerText = salad.recipe.label;
    const cuisineTypeTitle = document.createElement('h4');
    cuisineTypeTitle.innerText = "Cuisine Type";
    const cuisineType = document.createElement('p');
    cuisineType.innerText = salad.recipe.cuisineType[0]
    const image = document.createElement('img');
    image.src = salad.recipe.image;
    image.alt = salad.recipe.label;
    const recipeLink = document.createElement('a');
    const recipeTitle = document.createElement('h5')
    recipeTitle.innerText = "Below is the link to the full recipe:"
    recipeLink.href = salad.recipe.url
    recipeLink.innerText = "Click here"

    const saladRecommendations = document.createElement('li');
    saladRecommendations.classList.add('saladRecommendations')

    saladRecommendations.appendChild(title);
    saladRecommendations.appendChild(cuisineTypeTitle);
    saladRecommendations.appendChild(cuisineType);
    saladRecommendations.appendChild(image);
    saladRecommendations.appendChild(recipeLink);
    saladRecommendations.appendChild(recipeTitle);

    document.querySelector('#saladCombo').appendChild(saladRecommendations);

  });
};

// Get user selection and pass it as an argument to the q param
app.userSelection = () => {
  app.ingredientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const ingredients = document.querySelectorAll("input[name=ingredient]:checked");
    let ingredientArray = [...ingredients].map((ingredient) => {
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
  app.ingredientForm = document.querySelector("form"); 
  app.userSelection();
};

// Initialized our init method
app.init();
