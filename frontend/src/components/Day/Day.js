function findRecipe(recipes, id) {
  return recipes.filter((recipe) => recipe.id === id)[0];
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "copy";
}

function toIsoDate(date) {
  return date.toISOString().split("T", 1)[0];
}

function Day({ date, state, plan, setPlan, recipes }) {
  function onDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/id");
    const recipe = findRecipe(recipes, id);
    const newPlan = { ...plan };
    newPlan[toIsoDate(date)] = { recipe: recipe, notes: "" };
    setPlan(newPlan);
  }

  const recipeName =
    toIsoDate(date) in plan ? plan[toIsoDate(date)].recipe.name : "";

  return (
    <div
      className={"day " + state}
      key={date.getDate()}
      id={date.getDate()}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {date.getDate()}
      <br></br>
      {recipeName}
    </div>
  );
}

export default Day;
