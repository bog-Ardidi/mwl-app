import { auth, db, timestamp } from "../Config/firebase";

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
    .then((docRef: any) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
      alert("There was a problem with your submission");
    });
};
