import { auth, db, fbfs, timestamp } from "../Config/firebase";

interface submitProps {
  rating: number;
  duration: string;
}

export const SubmitWorkload = async (props: submitProps) => {
  const docData = {
    rating: props.rating,
    duration: props.duration,
    user_id: auth.currentUser.uid,
    timestamp: timestamp,
  };

  db.collection("mentalworkload")
    .add(docData)
    .catch((error: any) => {
      console.error("Error adding document: ", error);
      alert("There was a problem with your submission");
    });
};
