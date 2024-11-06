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

function Day({ date, state }) {
  return (
    <div
      className={"day " + state}
      key={date}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {date}
    </div>
  );
}

export default Day;
