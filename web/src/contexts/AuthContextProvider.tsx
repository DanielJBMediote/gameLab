import { Axios } from '@src:Services/Axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

type User = {
  id?: string;
  uuid?: string;
  email?: string;
  profile: any;
};

type AuthContextType = {
  user: User | undefined;
  apiSignIn: (data: {}) => Promise<void>;
  apiSignOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProps = {
  children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const isLoggedIn = async () => {
      if (localStorage.getItem('auth-token')) {
        let token = localStorage.getItem('auth-token');

        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }

        const response: any = await Axios.get('/users/logged', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response)
          setUser({
            ...response.data,
            profile: response.data.profiles,
          });
      }
    };
    isLoggedIn();
  }, []);

  async function apiSignIn(data: {}) {
    const response: any = await Axios.post('/login', data);
    if (response) {
      localStorage.setItem('auth-token', response.data.token);
    }
  }

  async function apiSignOut() {
    let token = localStorage.getItem('auth-token');
    if (token) {
      await Axios.get('/logout', {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        localStorage.removeItem('auth-token');
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, apiSignIn, apiSignOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
