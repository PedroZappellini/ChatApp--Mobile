import React, { createContext, useContext, useState } from "react";

interface IAuth {
  userName: IUserData;
  handleAuth: (name: string, id: string) => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IUserData {
  name: string;
  id: string;
}

const AuthContext = createContext<IAuth>({} as IAuth);

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<IUserData>({} as IUserData);

  const handleAuth = (name: string, id: string) => {
    setUserName({ name, id });
    console.log(name, id);
  };
  return (
    <AuthContext.Provider value={{ handleAuth, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const authState = useContext(AuthContext);
  return authState;
};
