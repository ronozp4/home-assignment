import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { UserData } from '../types';
import { getRandomId } from '../utils/tools';

interface AuthContextProps {
  user: UserData;
  allUsers: UserData[] | null
  login: (id: number) => void;
  logout: () => void;
  allUsersInit: (users: UserData[] | null) => void;
  changeUser: ()=> void;
  getUser: (id: number) => UserData;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userDefault = {name: '', id: 0}
  const [user, setUser] = useState<UserData>(userDefault);
  const [allUsers, setAllUsers] = useState<UserData[] | null>(null);

  useEffect(()=>{
    changeUser()
  },[allUsers])

  const login = (id: number) => {
    const chosenUser = getUser(id)
    setUser(chosenUser);
  };

  const logout = () => {
    setUser(userDefault);
  };
  const allUsersInit = (users: UserData[] | null) => {
    setAllUsers(users)
  }

  const changeUser = () => {
    login(getRandomId())
  }

  const getUser = (id: number) => {
    return allUsers?.find(user => user.id === id) || {name: '', id: 0}
  }

  return (
    <AuthContext.Provider value={{ user, allUsers, login, logout, allUsersInit, changeUser, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
