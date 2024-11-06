function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "copy";
}

function onDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/id");
  const name = e.dataTransfer.getData("text/name");
  e.target.textContent = name;
}

function toIsoDate(date) {
  return date.toISOString().split("T", 1)[0];
}

function Day({ date, state, plan, setPlan }) {
  let dayPlan;
  if (toIsoDate(date) in plan) {
    dayPlan = plan[toIsoDate(date)];
  } else {
    dayPlan = {};
  }

  const recipeName = Object.keys(dayPlan).length ? dayPlan.recipe.name : "";
  return (
    <div
      className={"day " + state}
      key={date.getDate()}
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
