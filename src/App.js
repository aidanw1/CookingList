import React, { useState, useEffect } from "react";
import RecipeEdit from "./components/RecipeEdit";
import Recipe from "./components/Recipe";
import RecipeList from "./components/RecipeList";
import { v4 as uuidv4 } from "uuid";
import "./css/App.css";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingList.reactRecipes";

export default function App() {
  //Go through all recipes, find the recipe with the given id of selectedRecipeId
  //if theres no recipe with that id, return undefined value so we know we have no selected recipe
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  //recipes state data
  const [recipes, setRecipes] = useState(sampleRecipes);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  //**** GET THE ID OF A RECIPE ON CLICK - USED IN ADD AND DELETE FUNCTION ****
  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);
  console.log(selectedRecipe);

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  //**** LOCAL STORAGE ****
  //GETTER - gets from local storage. GETTER needs to be before SETTER.
  //loading values from local storage
  //load values to local storage on every mount once
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    //if theres recipes in local storage it sets the recipes in local storage
    //converts json string to array
    if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  //SETTER - sets local storage to recipes
  useEffect(() => {
    console.log("Rendered");
    //local storage only accepts strings, strinigy the value it receives
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  //**** ADD A NEW RECIPE ****
  //creates a new object with blank default values and adds it to the recipes state array once clicked
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "New Recipe",
      servings: 0,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    //Give me all the recipes that isnt the recipe of the id passed in
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleRecipeChange(id, recipe) {
    //take id of recipe we want to change and the new recipe that were going to replace the old recipe with
    //get new recipe / copying array
    const newRecipes = [...recipes];
    //get index of recipe with this id, whatever recipe has the id we passed in, we'll get the index of it
    const index = newRecipes.findIndex((r) => r.id === id);
    //take new recipes and find recipe of that index and set it to new recipe
    //newRecipes is same as old recipes but has the recipe we changed, replacing the recipe of the id that we passed in
    //essentially swapping out one of the recipes in the array
    newRecipes[index] = recipe;
    //setRecipes to newRecipe array
    setRecipes(newRecipes);
  }
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <h1 style={{ borderBottom: "1px solid black", margin: 0, padding: "10px 0", textAlign: "center" }}>
        <span>👩‍🍳</span> React Cooking List <span>👨‍🍳</span>
      </h1>
      <RecipeList handleRecipeAdd={handleRecipeAdd} recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1.45",
    instructions: "1. Put salt on chicken\n2. Put chicken in oven \n3. Eat the chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on pork\n2. Put pork in oven \n3. Eat the pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];
