import { useEffect } from 'react';
import moment from 'moment-timezone';

const useTimezoneAlerts = (timezones) => {
  useEffect(() => {
    const checkDaylightSaving = () => {
      const now = moment.utc();
      timezones.forEach((tz) => {
        const isDST = moment.tz(now, tz).isDST();
        if (isDST) {
          alert(`${tz} is currently in Daylight Saving Time.`);
        }
      });
    };

    checkDaylightSaving();
  }, [timezones]);
};

export default useTimezoneAlerts;
