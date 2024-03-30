import {
  firebaseGetMWLDay,
  firebaseGetMWLMonth,
  firebaseGetMWLAll,
} from "../Controllers/Workload/ReadController";
import { MWLdata } from "../Types/mwl";

/**
 * Does the mapping from Firebase object received from DB to react state
 * that can be used by the calendar and the chart.
 */
const objectMap = (apiResponse: any) =>
  apiResponse?.docs?.map((e: any) => ({
    docId: e.id,
    data: {
      ...e.data(),
      timestamp: e.data().timestamp.toDate(),
    },
  }));

/**
 * Gets the data for a single day and puts it in state variable.
 */
export const getWorkloadForDay = (date: string, func: (e: any) => void) => {
  async function fetchData() {
    const res = await firebaseGetMWLDay(date);
    func(objectMap(res));
  }
  fetchData();
};

/**
 * Gets the data for a month and puts it in state variable.
 */
export const getWorkloadForMonth = (date: string, func: (e: any) => void) => {
  async function fetchData() {
    const res = await firebaseGetMWLMonth(date);
    func(objectMap(res));
  }
  fetchData();
};

export const getAllWorkloadForUser = (func: (e: any) => void) => {
  async function fetchData() {
    const res = await firebaseGetMWLAll();
    func(objectMap(res));
  }
  fetchData();
};

/**
 * Rounds up number up to specified number of decimal points.
 *
 * @param value - The number to be rounded up
 * @param precision - How many decimal points to leave
 */
export const roundToDecimal = (value: number, precision: number) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

/**
 * Puts a number within certain limit
 *
 * @param num - The number
 * @param MIN - The minimum the number can get (default 10)
 * @param MAX - The maximum the number can get (default 30)
 */
export const limitNumberWithinRange = (num: string, MIN = 10, MAX = 30) => {
  const parsed = parseFloat(num);
  return Math.min(Math.max(parsed, MIN), MAX);
};

// All MWL classifications
export enum MWL {
  UNSURE = 0,
  GOOD = 1,
  BAD_LOW = 2,
  BAD_MID = 3,
  BAD_HIGH = 4,
}

/**
 * Calculates the MWL balance for a time period.
 */
export const calculateOverallMWL = (data: any) => {
  var durationLow = 0,
    durationMid = 0,
    durationHigh = 0;

  // Return if only 1 value
  if (data.length <= 1) return MWL.UNSURE;

  // Assign points to each level
  data.forEach((e: MWLdata) => {
    var taskRating = Number(e["data"]["rating"]);
    var taskDuration = Number(e["data"]["duration"]);

    if (taskRating <= 2) {
      durationLow += taskDuration;
    }

    if (taskRating >= 2 && taskRating <= 4) {
      durationMid += taskDuration;
    }

    if (taskRating >= 4) {
      durationHigh += taskDuration;
    }
  });

  var durations = [durationLow, durationMid, durationHigh];
  // Calculate the level with highest duration
  var highest = durations.indexOf(
    Math.max(...[durationLow, durationMid, durationHigh])
  );
  var rest = 0;

  // Order the MWL level list
  durations.map((e) => {
    if (e == durations[highest]) return;

    rest += e;
  });

  // Calculate if MWL is bad
  // x MWL is bad iff x + 120min > y + z
  if (durations[highest] > rest + 120) {
    switch (highest) {
      case 0:
        return MWL.BAD_LOW;

      case 1:
        return MWL.BAD_MID;

      case 3:
        return MWL.BAD_HIGH;
    }
  } else return MWL.GOOD;
};
