import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TimeZoneSlider from "./TimeZoneSlider";
import DatePickerComponent from "./DatePickerComponent";
import TimezoneSearch from "./TimezoneSearch";
import ThemeToggle from "./ThemeToggle";
import Header from "./Header";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import useTimezoneAlerts from "../hooks/useTimezoneAlerts";
import useDarkMode from "../hooks/useDarkMode";
import moment from "moment-timezone";
import "../styles/TimeZoneConverter.css";

const TimeZoneConverter = () => {
  const [timezones, setTimezones] = useState(["UTC", "Asia/Kolkata"]);
  const [time, setTime] = useState(moment.utc());
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [view, setView] = useState("list");

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(timezones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTimezones(items);
  };

  const addTimezone = (timezone) => {
    if (!timezones.includes(timezone.value)) {
      setTimezones([...timezones, timezone.value]);
    }
  };

  const removeTimezone = (timezone) => {
    setTimezones(timezones.filter((tz) => tz !== timezone));
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  useTimezoneAlerts(timezones);

  return (
    <div className={`timezone-converter ${isDarkMode ? "dark-mode" : ""}`}>
      <Header />
      <DatePickerComponent time={time} setTime={setTime} />
      <TimezoneSearch addTimezone={addTimezone} />
      <div className="controls">
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
        >
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon className="color"/>
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModuleIcon className="color"/>
          </ToggleButton>
        </ToggleButtonGroup>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="timezones">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`timezone-list ${view === "grid" ? "grid-view" : ""}`}
            >
              {timezones.map((timezone, index) => (
                <TimeZoneSlider
                  key={timezone}
                  timezone={timezone}
                  time={time}
                  setTime={setTime}
                  removeTimezone={removeTimezone}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TimeZoneConverter;
