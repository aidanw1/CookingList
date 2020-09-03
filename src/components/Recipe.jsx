import React, { useContext } from "react";
import PropTypes from "prop-types";
import IngredientList from "./IngredientList";
import { RecipeContext } from "../App";

//individual Recipe - getting mapped over from RecipeList and passed the values down as props
export default function Recipe(props) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);

  const { id, name, cookTime, servings, instructions, ingredients } = props;
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
        <div>
          {/* handleRecipeSelect get the id so that the right edit panel can be shown */}
          <button className="btn btn--primary mr-1" onClick={() => handleRecipeSelect(id)}>
            Edit
          </button>
          <button className="btn btn--danger" onClick={() => handleRecipeDelete(id)}>
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook Time:</span>
        <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Servings:</span>
        <span className="recipe__value">{servings}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Instructions:</span>
        <div className="recipe__value recipe__instructions recipe__value--indented">{instructions}</div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredients:</span>
        <div className="recipe__value recipe__value--indented">
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}

Recipe.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cookTime: PropTypes.string.isRequired,
  servings: PropTypes.number.isRequired,
};
