import { db } from "../../Config/firebase";

const MWL_COLLECTION = "mentalworkload";

export const DeleteWorkload = (docId: string) => {
  db.collection(MWL_COLLECTION)
    .doc(docId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error: any) => {
      console.error("Error removing document: ", error);
    });
};
