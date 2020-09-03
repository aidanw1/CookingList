import React from "react";
import Ingredient from "./Ingredient";

//mapping over individal Ingredient and receiving props from Ingredient inside RecipeList
export default function IngredientList({ ingredients }) {
  const ingredientElements = ingredients.map((ingredient) => {
    return <Ingredient key={ingredient.id} {...ingredient} />;
  });
  return <div className="ingredient-grid">{ingredientElements}</div>;
}
