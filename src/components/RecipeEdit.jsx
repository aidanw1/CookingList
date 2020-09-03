import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "../App";
import { v4 as uuidv4 } from "uuid";

function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(changes) {
    //takes a list of the changes we want to make
    //takes current recipe and adding everything from changes and overriding everything in changes
    //telling us the id we want to replace
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  // handleChange({ name: "New Name" });

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange({ ingredients: recipe.ingredients.filter((i) => i.id !== id) });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button onClick={handleRecipeSelect} className="btn recipe-edit__remove-button">
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input onChange={(e) => handleChange({ name: e.target.value })} value={recipe.name} type="text" name="name" id="name" className="recipe-edit__input" />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        {/* e.target.value is always a string - need to convert to number */}
        <input onChange={(e) => handleChange({ cookTime: parseInt(e.target.value) || "" })} value={recipe.cookTime} type="text" name="cookTime" id="cookTime" className="recipe-edit__input" />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings
        </label>
        <input onChange={(e) => handleChange({ servings: e.target.value })} value={recipe.servings} type="servings" min="1" name="servings" id="servings" className="recipe-edit__input" />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea onChange={(e) => handleChange({ instructions: e.target.value })} name="instructions" id="instructions" className="recipe-edit__input" value={recipe.instructions} />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit key={ingredient.id} ingredient={ingredient} handleIngredientChange={handleIngredientChange} handleIngredientDelete={handleIngredientDelete} />
        ))}

        {/* Ingredient Components
         */}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button onClick={() => handleIngredientAdd()} className="btn btn--primary">
          Add Ingredient
        </button>
      </div>
    </div>
  );
}

export default RecipeEdit;
