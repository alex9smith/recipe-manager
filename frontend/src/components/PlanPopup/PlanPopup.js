import "./PlanPopup.css";

function PlanPopup({ date, plan, setPlan, recipe }) {
  function clearDay(e) {
    const newPlan = { ...plan };
    delete newPlan[date];
    setPlan(newPlan);
    e.target.parentElement.classList.remove("active");
  }

  function closePopup(e) {
    e.target.parentElement.classList.remove("active");
  }

  return (
    <div className="plan-popup">
      <div>{recipe.name}</div>
      <button type="button" onClick={clearDay}>
        Clear
      </button>
      <button type="button" onClick={closePopup}>
        Close
      </button>
    </div>
  );
}

export default PlanPopup;
