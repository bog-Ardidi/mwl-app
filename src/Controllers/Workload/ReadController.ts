import { auth, db } from "../../Config/firebase";

const MWL_COLLECTION = "mentalworkload";

/**
 * Get all tasks for passed date
 * @param currentDate - date passed
 */
export const firebaseGetMWLDay = async (currentDate: string) => {
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

/**
 * Get all tasks for passed month
 * @param currentDate - month passed
 */
export const firebaseGetMWLMonth = async (currentDate: string) => {
  const date = new Date(currentDate),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDayOfMonth = new Date(y, m, 1);
  const lastDayOfMonth = new Date(y, m + 1, 0);
  lastDayOfMonth.setHours(23, 59, 59);

  return db
    .collection(MWL_COLLECTION)
    .where("user_id", "==", auth.currentUser.uid)
    .where("timestamp", ">=", firstDayOfMonth)
    .where("timestamp", "<=", lastDayOfMonth)
    .get();
};

/**
 * Get all tasks for the logged account.
 */
export const firebaseGetMWLAll = async () => {
  return db
    .collection(MWL_COLLECTION)
    .where("user_id", "==", auth.currentUser.uid)
    .orderBy("timestamp", "desc")
    .get();
};
