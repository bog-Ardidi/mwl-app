import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth();

interface AuthProps {
  email: string;
  password: string;
}

export const FirebaseSignIn = ({ email, password }: AuthProps) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) =>
    alert(error.message)
  );
};

export const FirebaseRegister = ({ email, password }: AuthProps) => {
  createUserWithEmailAndPassword(auth, email, password).catch((error) =>
    alert(error.message)
  );
};

export const FirebaseSignOut = () => {
  signOut(auth).catch((error) => alert(error.message));
};
