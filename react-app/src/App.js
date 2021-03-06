import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { authenticate } from "./store/session";
import Splash from "./components/splash/splash";
import Home from "./components/Home/home";
import Add from "./components/AddHangout";
import Edit from "./components/EditHangout";
import Footer from "./components/footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/home" exact={true}>
          <Home />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/new" exact={true}>
          <Add />
        </ProtectedRoute>
        <ProtectedRoute path="/:hangoutId/edit" exact={true}>
          <Edit />
        </ProtectedRoute>
        <ProtectedRoute path="/:userId/profile" exact={true}>
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
