'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // useRouter here to handle redirection within the context
import { auth, githubProvider } from './firebase'; // Assume you have firebase set up

const AuthContext = createContext();

export const useUserAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/week-9'); // Redirect to landing page if not logged in
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  const gitHubSignIn = async () => {
    try {
      await auth.signInWithPopup(githubProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const firebaseSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    user,
    gitHubSignIn,
    firebaseSignOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
