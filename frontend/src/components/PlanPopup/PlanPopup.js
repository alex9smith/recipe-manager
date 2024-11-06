import "./PlanPopup.css";

function PlanPopup({ plan }) {
  return (
    <div className="plan-popup">
      <div>{plan.recipe.name}</div>
      <button type="button">Clear</button>
    </div>
  );
}

export default PlanPopup;
