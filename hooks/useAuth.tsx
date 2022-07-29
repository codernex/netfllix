import {
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => {},
  logout: async () => {},
  signUp: async () => {},
  err: null,
  loading: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  //Persisting the user on authstatechanged
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        router.push('/login');
      }
    });

    setInitialLoading(false);
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        setUser(userCred.user);
        router.push('/');
        setLoading(false);
      })
      .catch(err => setErr(err))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        setUser(userCred.user);
        router.push('/');
        setLoading(false);
      })
      .catch(err => setErr(err))
      .finally(() => setLoading(false));
  };

  const logOut = async () => {
    setLoading(true);

    await signOut(auth)
      .then(() => {
        setUser(null);
        router.push('/login');
        setLoading(false);
      })
      .catch(err => setErr(err))
      .finally(() => setLoading(false));
  };

  const memorizedValue = useMemo(
    () => ({
      user,
      signIn,
      logout: logOut,
      signUp,
      err,
      loading
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memorizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
