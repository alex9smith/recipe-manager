function Day({ date, state }) {
  return (
    <div className={"day " + state} key={date}>
      {date}
    </div>
  );
}

export default Day;
