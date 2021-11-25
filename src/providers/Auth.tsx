import React, { useEffect, useState, createContext, useContext } from "react";
import { Auth, Hub } from "aws-amplify";
import { UserInterface } from "../interfaces/UserInterface";

const AuthContext = createContext({
  signIn: () => {},
  signOut: () => {},
  user: {} as UserInterface | null,
  loading: true
});
const AuthCustomProvider = process.env.REACT_APP_AUTH_PROVIDER;

export const AuthProvider = props => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const userData = await Auth.currentAuthenticatedUser();
      return userData;
    } catch (e) {}
  };

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then(userData => {
            return setUser(userData);
          });
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          setUser(null);
          break;
      }
    });

    getUser().then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const signIn = () => {
  return Auth.federatedSignIn({ customProvider: AuthCustomProvider! });
};

const signOut = () => {
  return Auth.signOut();
};
