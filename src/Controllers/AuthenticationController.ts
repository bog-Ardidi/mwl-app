import { auth } from "../Config/firebase";

interface AuthProps {
  email: string;
  password: string;
}

export const FirebaseSignIn = ({ email, password }: AuthProps) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch((error: any) => alert(error.message));
};

export const FirebaseRegister = ({ email, password }: AuthProps) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error: any) => alert(error.message));
};

export const FirebaseSignOut = () => {
  auth.signOut().catch((error: any) => alert(error.message));
};
