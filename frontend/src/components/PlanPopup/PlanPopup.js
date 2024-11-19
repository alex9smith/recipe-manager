import { Box, Dialog, Textarea } from "@primer/react";

function PlanPopup({ date, plan, setPlan, togglePopup }) {
  function clearDay(e) {
    togglePopup();
    const newPlan = { ...plan };
    delete newPlan[date];
    setPlan(newPlan);
  }

  function updateNotes(e) {
    daysPlan.notes = e.target.value;
    const newPlan = { ...plan };
    newPlan[date] = daysPlan;
    setPlan(newPlan);
  }

  const hasPlan = date in plan;
  const daysPlan = hasPlan ? plan[date] : { recipe: {}, notes: "" };

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
      <Box>{daysPlan.recipe?.name}</Box>
      <Textarea value={daysPlan.notes} onChange={updateNotes} />
    </Dialog>
  );
}

export default PlanPopup;
