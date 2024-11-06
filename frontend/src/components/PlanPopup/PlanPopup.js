import "./PlanPopup.css";

function PlanPopup({ date, plan, setPlan, recipe }) {
  function clearDay(e) {
    const newPlan = { ...plan };
    delete newPlan[date];
    setPlan(newPlan);
    e.target.parentElement.parentElement.classList.remove("active");
  }

  function closePopup(e) {
    e.target.parentElement.parentElement.classList.remove("active");
  }

  function updateNotes(e) {
    const newPlan = { ...plan };
    newPlan[date].notes = e.target.value;
    setPlan(newPlan);
  }

  return (
    <div className="plan-popup">
      <div className="plan-popup-overlay"></div>
      <div className="plan-popup-content">
        <div>{recipe.name}</div>
        <div className="notes">
          <textarea value={plan[date].notes} onChange={updateNotes} />
        </div>
        <button type="button" onClick={clearDay}>
          Clear recipe
        </button>
        <button type="button" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PlanPopup;
