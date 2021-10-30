import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import RegisterPage from "./pages/RegisterPage";
import { Axios } from "./services/axios";



type User = {
  id?: string;
  uuid?: string;
  email?: string;
  profile: any
};

type AuthContextType = {
  user: User | undefined;
  apiSignIn: (data: {}) => Promise<void>;
  apiSignOut: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);


function App() {
  const [user, setUser] = useState<User>();

  React.useEffect(() => {
    const isLoggedIn = async () => {
      if (localStorage.getItem("auth-token")) {
        let token = localStorage.getItem("auth-token");

        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }

        const response: any = await Axios.get("/users/logged", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) setUser({
          ...response.data,
          profile: response.data.profiles,
        })
      }
    };
    isLoggedIn()
  }, []);

  async function apiSignIn(data: {}) {
    const response: any = await Axios.post("/login", data);
    if (response) {
      localStorage.setItem("auth-token", response.data.token)
    }

    

  }


  async function apiSignOut() {
    let token = localStorage.getItem("auth-token");
    if (token) {
      await Axios.get("/logout", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        localStorage.removeItem("auth-token")
      });
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, apiSignIn, apiSignOut }}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path={["/", "/home"]} component={HomePage} exact />
          <Route component={Page404} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
