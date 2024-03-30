import { CalendarUtils } from "react-native-calendars";
import colors from "../Config/colors";
import { roundToDecimal } from "./workloadHelper";

/**
 * Returns an array of the dates between two dates that are passed.
 */
export const getDatesInRange = (startDate: Date, endDate: Date) => {
  const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
  const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));

  const date = new Date(start.getTime());

  const dates = [];

  while (date <= end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

/**
 * Returns object of objects that that represent the marked dates on the calendar
 * during the comparison mode! (e.g marking the dates pink)
 *
 * @param dates - List of dates
 * @param range - decides if we will have the styling for a date range or for a single
 * date selection
 */
export const calculateRangeObject = (dates: Date[], range = false) => {
  return Object.fromEntries(
    dates.map((e, index) => [
      [CalendarUtils.getCalendarDateString(e)],
      {
        ...(range ? { startingDay: index === 0 } : { startingDay: true }),
        ...(range
          ? { endingDay: index === dates.length - 1 }
          : { endingDay: true }),
        color: range ? colors.primaryRed : colors.hotPink,
      },
    ])
  );
};

/**
 * Checks if two timestamps happened on the same day.
 */
export const checkSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * Returns the difference in days beween two date objects
 */
export const dateDiffInDays = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

/**
 * Resets a date passed to 00:00:000 time that day.
 */
export const resetDateTime = (date: Date) => {
  const newDate = new Date(date.setHours(0, 0, 0, 0));
  return newDate;
};

/**
 * Formats a time period depending on if it is in hours our in minutes.
 * Usually used for UI.
 *
 * @param time - the time period
 */
export const getTimeExt = (time: number) =>
  time < 60 ? `${time} min` : `${roundToDecimal(time / 60, 1)} hrs`;

/**
 * Time format
 * day/month/year
 */
export const dateOptionsShort: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

/**
 * Time format
 * day of week, day/month/year
 */
export const dateOptionsLong: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
