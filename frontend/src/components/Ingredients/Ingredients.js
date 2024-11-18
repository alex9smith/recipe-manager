function Ingredients({ recipe }) {
  const ingredients = recipe.ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));
  return (
    <div>
      <br />
      Ingredients:
      <ul>{ingredients}</ul>
    </div>
  );
}

export default Ingredients;
