import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreem } from "../components/auth/LoginScreem";
import { CalendarScreem } from "../components/calendar/CalendarScreem";
import { Loading } from "../components/loading/Loading";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
            
        dispatch(startChecking());
    }, 4000);
  }, [dispatch]);

    if(checking) {
        
        return <Loading />
    }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            isAutenticated={!!uid}
            path="/login"
            component={LoginScreem}
          />
          <PrivateRoute
            exact
            isAutenticated={!!uid}
            path="/"
            component={CalendarScreem}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
