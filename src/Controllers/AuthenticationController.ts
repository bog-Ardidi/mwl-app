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
    .then(() => {
      alert(`Account with email ${email} created!`);
    })
    .catch((error: any) => alert(error.message));
};

export const FirebaseSignOut = () => {
  auth.signOut().catch((error: any) => alert(error.message));
};

export const FirebaseForgottenPassword = (email: string) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset link has been sent to your email address!");
    })
    .catch((error: any) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
};
