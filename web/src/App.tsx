import React, { useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import RegisterPage from "./pages/RegisterPage";

import { Axios } from "./services/axios";

type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | undefined;
  apiSignIn: (data: object) => Promise<any>;
  apiSignOut: () => Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextType);


function App() {
  const [user, setUser] = useState<User>();
  const history = useHistory();

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem("auth-token")) {
        let token = localStorage.getItem("auth-token");

        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const user = (
          await Axios.get("/users/user/by-token", {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;
        setUser(user);
      }
    };
    checkLoggedIn();
  }, []);

  async function apiSignIn(data: any) {
    return await Axios.post("/login", data);
  }
  

  async function apiSignOut() {
    let token = localStorage.getItem("auth-token");
    await Axios.get("/logout", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      history.push("/login");
    });
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, apiSignIn, apiSignOut }}>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path={["/", "/home"]} component={HomePage} exact/>
          <Route component={Page404} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
