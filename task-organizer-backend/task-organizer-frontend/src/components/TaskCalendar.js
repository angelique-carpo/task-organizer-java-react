import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';

function TaskCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Monthly Calendar</h2>
      <Calendar onChange={setValue} value={value} locale="el-GR" />
    </div>
  );
}

export default TaskCalendar;
