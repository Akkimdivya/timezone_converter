import React from 'react';
import Select from 'react-select';
import moment from 'moment-timezone';
import '../styles/TimezoneSearch.css';

const TimezoneSearch = ({ addTimezone }) => {
  const timezoneOptions = moment.tz.names().map(tz => ({ label: tz, value: tz }));

  return (
    <div className="timezone-search">
      <Select
        options={timezoneOptions}
        onChange={addTimezone}
        placeholder="Add a timezone"
      />
    </div>
  );
};

export default TimezoneSearch;
