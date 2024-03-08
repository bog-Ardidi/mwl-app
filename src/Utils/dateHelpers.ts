import { CalendarUtils } from "react-native-calendars";

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
 * during the comparison mode! Takes a list of dates as an input.
 * @range - decides if we will have the styling for a date range or for a single
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
        color: range ? "red" : "pink",
      },
    ])
  );
};

export const testCalc = (data: any) => {
  return Object.fromEntries(
    data.map((e: any) => [
      [CalendarUtils.getCalendarDateString(e.data.timestamp.toDate())],
      {
        color: "pink",
      },
    ])
  );
};
