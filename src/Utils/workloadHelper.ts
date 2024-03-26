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
