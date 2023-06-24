const entries = habitList.flatMap((habit) =>
  habit.log.map((entry) => ({
    title:
      entry.action === "done" ? "✓" : entry.action === "notdone" ? "X" : "-",
    date: entry.date,
  }))
);

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();
});
