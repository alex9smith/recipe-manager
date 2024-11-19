import { Box, Dialog, Textarea } from "@primer/react";

function PlanPopup({ date, plan, setPlan, recipe, togglePopup }) {
  function clearDay(e) {
    togglePopup();
    const newPlan = { ...plan };
    delete newPlan[date];
    setPlan(newPlan);
  }

  function updateNotes(e) {
    const newPlan = { ...plan };
    newPlan[date].notes = e.target.value;
    setPlan(newPlan);
  }

  return (
    <Dialog
      width="medium"
      height="auto"
      onClose={togglePopup}
      title={date}
      footerButtons={[
        { buttonType: "danger", content: "Clear recipe", onClick: clearDay },
        {
          buttonType: "primary",
          content: "Close",
          onClick: togglePopup,
        },
      ]}
    >
      <Box>{recipe.name}</Box>
      <Textarea
        value={plan[date] ? plan[date].notes : ""}
        onChange={updateNotes}
      />
    </Dialog>
  );
}

export default PlanPopup;
