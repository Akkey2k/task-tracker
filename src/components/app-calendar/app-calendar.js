import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './app-calendar.css';


function AppCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="app-calendar">
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default AppCalendar;