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
