import { Box, Dialog, Textarea } from "@primer/react";
import Source from "../Source/Source";
import Ingredients from "../Ingredients/Ingredients";

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
      <br></br>
      {daysPlan.recipe.source && (
        <Box>
          <Source source={daysPlan.recipe.source} />
          <Ingredients recipe={daysPlan.recipe} />
        </Box>
      )}
      <Textarea value={daysPlan.notes} onChange={updateNotes} />
    </Dialog>
  );
}

export default PlanPopup;
