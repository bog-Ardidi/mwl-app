import { auth, db, timestampFromDate } from "../../Config/firebase";

export interface workloadProps {
  rating: number;
  duration: number;
  name: string;
  date: Date;
}

const MWL_COLLECTION = "mentalworkload";

export const SubmitWorkload = async (props: workloadProps) => {
  const docData = {
    name: props.name,
    rating: props.rating,
    duration: props.duration,
    user_id: auth.currentUser.uid,
    timestamp: timestampFromDate(props.date),
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
