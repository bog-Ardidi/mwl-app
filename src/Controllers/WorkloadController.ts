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

export const getWorkloadForToday = async () => {
  const today = new Date();

  return db
    .collection(MWL_COLLECTION)
    .where("user_id", "==", auth.currentUser.uid)
    .get();
};
