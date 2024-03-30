import {
  firebaseGetMWLDay,
  firebaseGetMWLMonth,
  firebaseGetMWLAll,
} from "../Controllers/Workload/ReadController";

const objectMap = (apiResponse) =>
  apiResponse?.docs?.map((e: any) => ({
    docId: e.id,
    data: {
      ...e.data(),
      timestamp: e.data().timestamp.toDate(),
    },
  }));

export const getWorkloadForDay = (date: string, func: (e: any) => void) => {
  async function fetchData() {
    const res = await firebaseGetMWLDay(date);
    func(objectMap(res));
  }
  fetchData();
};

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

export const roundToDecimal = (value: number, precision: number) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const limitNumberWithinRange = (num: string, MIN = 10, MAX = 30) => {
  const parsed = parseFloat(num);
  return Math.min(Math.max(parsed, MIN), MAX);
};

export enum MWL {
  UNSURE = 0,
  GOOD = 1,
  BAD_LOW = 2,
  BAD_MID = 3,
  BAD_HIGH = 4,
}

export const calculateOverallMWL = (data: any) => {
  var durationLow = 0,
    durationMid = 0,
    durationHigh = 0;

  if (data.length <= 1) return MWL.UNSURE;

  data.forEach((e) => {
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
  var highest = durations.indexOf(
    Math.max(...[durationLow, durationMid, durationHigh])
  );
  var rest = 0;

  durations.map((e) => {
    if (e == durations[highest]) return;

    rest += e;
  });

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
