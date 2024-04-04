import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface MWLdata {
  docId: string;
  data: {
    name: string;
    rating: string;
    duration: string;
    timestamp: any;
  };
}

export interface FirebaseDoc {
  duration: number;
  name: string;
  rating: number;
  timestamp: FirebaseFirestoreTypes.timestamp;
  user_id: string;
}
