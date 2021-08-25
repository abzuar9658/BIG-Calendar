import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Holidays = ({ events }) => {
  let myEventsList;
  if (events) {
    myEventsList = events.map((event) => ({
      start: new Date(event.date.iso),
      end: new Date(event.date.iso),
      title: event.name,
    }));
  }
  if (events) {
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  } else return <p>Something went wrong...</p>;
};
export default Holidays;
