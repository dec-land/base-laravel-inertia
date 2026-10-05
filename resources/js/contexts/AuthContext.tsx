import { usePage } from '@inertiajs/react';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';

type AuthView = 'login' | 'register';

interface AuthContextType {
  isModalOpen: boolean;
  view: AuthView;
  openModal: (view?: AuthView) => void;
  closeModal: () => void;
  setView: (view: AuthView) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');

  const openModal = (initialView: AuthView = 'login') => {
    setView(initialView);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{ isModalOpen, view, openModal, closeModal, setView }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthProvider');
  }
  return context;
};

export const useAuth = () => {
  const { auth } = usePage().props;
  return {
    user: auth?.user ?? null,
    isAuthenticated: !!auth?.user,
  };
};
