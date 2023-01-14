import { useFirebase } from "react-redux-firebase";

import { DOMAIN } from "src/constants";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${DOMAIN}/finish-login`,
  // This must be true.
  handleCodeInApp: true,
};

export const useAuthService = () => {
  const firebase = useFirebase();

  return {
    logIn: (email: string, search?: string) => {
      window.localStorage.setItem("emailForSignIn", email);
      if (search) {
        actionCodeSettings.url += search;
      }
      return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    },
    logOut: () => {
      return firebase.logout();
    },
    updateProfile: (profile: { displayName?: string; photoURL?: string }) => {
      return firebase.auth().currentUser?.updateProfile(profile);
    },
  };
};
