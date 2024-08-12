import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Slider from 'react-slider';
import moment from 'moment-timezone';
import '../styles/TimeZoneSlider.css';

const TimeZoneSlider = ({ timezone, time, setTime, removeTimezone, index }) => {
  const handleTimeChange = (newTime) => {
    const utcTime = moment.utc(time).startOf('day').add(newTime, 'minutes');
    setTime(utcTime);
  };

  const localTime = moment.utc(time).tz(timezone);
  const convertedTime = localTime.format('hh:mm A');

  const isWorkingHour = localTime.hour() >= 9 && localTime.hour() <= 17;

  return (
    <Draggable draggableId={timezone} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`timezone-slider ${isWorkingHour ? 'working-hour' : ''}`}
        >
          <span className="timezone-name">{timezone}</span>
          <Slider
            min={0}
            max={1440}
            value={localTime.hour() * 60 + localTime.minute()} 
            onChange={handleTimeChange}
          />
          <span className="timezone-time">{convertedTime}</span>
          <button onClick={() => removeTimezone(timezone)} className="remove-btn">✕</button>
        </div>
      )}
    </Draggable>
  );
};

export default TimeZoneSlider;
