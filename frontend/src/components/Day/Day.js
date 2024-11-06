import PlanPopup from "../PlanPopup/PlanPopup";

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

function showPopup(e) {
  const popup = e.target.querySelector(".plan-popup");
  if (popup) {
    popup.classList.add("active");
  }
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

  const hasPlan = toIsoDate(date) in plan;
  const recipeName = hasPlan ? plan[toIsoDate(date)].recipe.name : "";

  const popup = hasPlan ? (
    <PlanPopup
      date={toIsoDate(date)}
      recipe={plan[toIsoDate(date)].recipe}
      plan={plan}
      setPlan={setPlan}
    />
  ) : (
    ""
  );

  return (
    <div
      className={`day ${state} ${hasPlan ? "planned" : ""}`}
      key={date.getDate()}
      id={date.getDate()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={showPopup}
    >
      {date.getDate()}
      <br></br>
      {recipeName}
      {popup}
    </div>
  );
}

export default Day;
