import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';
import '../styles/DatePickerComponent.css';

const DatePickerComponent = ({ time, setTime }) => {
  const handleDateChange = (date) => {
    setTime(moment.utc(date));
  };

  return (
    <div className="date-picker-component">
      <h3>Select Date and Time:</h3>
      <DatePicker
        selected={time.toDate()}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="date-picker"
      />
    </div>
  );
};

export default DatePickerComponent;
