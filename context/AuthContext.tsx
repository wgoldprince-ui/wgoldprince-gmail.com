import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Order } from '../types';
import { MOCK_ORDERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  orders: Order[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // Mock login
    setUser({
      id: 'u1',
      name: 'Cliente Vip',
      email: 'cliente@galeriaapple.com',
      avatar: 'https://picsum.photos/100/100'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, orders: user ? MOCK_ORDERS : [] }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
