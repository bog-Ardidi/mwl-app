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

export const getWorkloadForDay = (date, func) => {
  async function fetchData() {
    const res = await firebaseGetMWLDay(date);
    func(objectMap(res));
  }
  fetchData();
};

export const getWorkloadForMonth = (date, func) => {
  async function fetchData() {
    const res = await firebaseGetMWLMonth(date);
    func(objectMap(res));
  }
  fetchData();
};

export const getAllWorkloadForUser = (func) => {
  async function fetchData() {
    const res = await firebaseGetMWLAll();
    func(objectMap(res));
  }
  fetchData();
};

export const roundToDecimal = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const limitNumberWithinRange = (num, MIN = 10, MAX = 30) => {
  const parsed = parseFloat(num);
  return Math.min(Math.max(parsed, MIN), MAX);
};

export enum MWL {
  GOOD,
  BAD,
  UNSURE,
}

export const calculateOverallMWL = (data) => {
  var numLow = 0,
    numMid = 0,
    numHigh = 0;
  var durationLow = 0,
    durationMid = 0,
    durationHigh = 0;

  data.forEach((e) => {
    var taskRating = Number(e["data"]["rating"]);
    var taskDuration = Number(e["data"]["duration"]);

    if (taskRating <= 2) {
      numLow++;
      durationLow += taskDuration;
    }

    if (taskRating >= 2 && taskRating <= 4) {
      numMid++;
      durationMid += taskDuration;
    }

    if (taskRating >= 4) {
      numHigh++;
      durationHigh += taskDuration;
    }
  });

  console.log("num low: ", numLow, "num mid: ", numMid, "num high: ", numHigh);
  console.log(
    "duration low: ",
    durationLow,
    "duration mid: ",
    durationMid,
    "duration high: ",
    durationHigh
  );
};
