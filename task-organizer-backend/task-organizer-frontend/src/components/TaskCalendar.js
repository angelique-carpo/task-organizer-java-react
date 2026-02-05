import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function TaskCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Task Calendar</h3>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}

export default TaskCalendar;
