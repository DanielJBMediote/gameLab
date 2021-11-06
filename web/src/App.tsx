import LoginPage from '@src:Pages/Auth/Login';
import RegisterPage from '@src:Pages/Auth/Register';
import Page404 from '@src:Pages/Error404';
import HomePage from '@src:Pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from '@src:Contexts/AuthContextProvider';

function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path={['/', '/home']} component={HomePage} exact />
            <Route component={Page404} />
          </Switch>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
