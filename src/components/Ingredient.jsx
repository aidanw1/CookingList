import React from "react";

export default function Ingredient({ name, amount }) {
  //individual ingredient list - mapped over by Ingredient and passed the values down
  return (
    <>
      <span>{name}</span>
      <span>{amount}</span>
    </>
  );
}
