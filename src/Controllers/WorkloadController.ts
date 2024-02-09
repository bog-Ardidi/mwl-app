import { auth, db, timestamp } from "../Config/firebase";

export interface workloadProps {
  rating: number;
  duration: string;
  name: string;
}

const MWL_COLLECTION = "mentalworkload";

export const SubmitWorkload = async (props: workloadProps) => {
  const docData = {
    name: props.name,
    rating: props.rating,
    duration: props.duration,
    user_id: auth.currentUser.uid,
    timestamp: timestamp,
  };

  db.collection(MWL_COLLECTION)
    .add(docData)
    .then((docRef: any) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Score submitted successfully");
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
      alert("There was a problem with your submission");
    });
};

export const getWorkloadForToday = async (currentDate: string) => {
  const startOfDay = new Date(currentDate);
  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59);
  startOfDay.setHours(0, 0, 0);

  return db
    .collection(MWL_COLLECTION)
    .where("user_id", "==", auth.currentUser.uid)
    .where("timestamp", ">=", startOfDay)
    .where("timestamp", "<", endOfDay)
    .get();
};

export const getWorkloadForMonth = async (currentDate: string) => {
  const date = new Date(currentDate),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDayOfMonth = new Date(y, m, 1);
  const lastDayOfMonth = new Date(y, m + 1, 0);

  return db
    .collection(MWL_COLLECTION)
    .where("user_id", "==", auth.currentUser.uid)
    .where("timestamp", ">=", firstDayOfMonth)
    .where("timestamp", "<", lastDayOfMonth)
    .get();
};

export const getAllWorkloadForUser = async () => {
  return db
    .collection(MWL_COLLECTION)
    .where("user_id", "==", auth.currentUser.uid)
    .get();
};
