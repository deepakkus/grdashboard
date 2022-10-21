import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./calendarCard.scss"
export default function CalenderCard() {
  const [value, onChange] = useState(new Date());
  // const style = { height: "20vh" };
  return (
    
    <Calendar onChange={onChange} value={value}/>
    
  );
}
