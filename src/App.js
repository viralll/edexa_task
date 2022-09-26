import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Details";
import ErrorPage from "./components/Errror";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AuthenticateRoute from "./components/Authenticate";

function App() {
  return (
    <>
      <Router>
      <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />

          <AuthenticateRoute path="/details" component={Dashboard} exact />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
