import { useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  withRouter,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Authentication from "./pages/authentication";
import { connect } from "react-redux";
import needAuth from "./configs/needAuth";
import {
  useLocalStorage,
  isEmptyString,
} from "@staketab/lib";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";

const Routes = () => {
  const [token] = useLocalStorage("token");
  const history = useHistory();

  useEffect(() => {
    if (needAuth && isEmptyString(token)) {
      history.push(`/login`);
    }
  }, []);

  useEffect(() => {
    if (history?.action === "POP") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (needAuth && !isEmptyString(token)) || !needAuth ? (
    <Switch>
      <Route exact path="/">
        <Redirect to={`/newshub`} />
      </Route>
      <Route path="/news/:id" component={NewsDetailsPage} />
      <Route path="/newshub/" component={NewsPage} />
      <Route path="/:net/404" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" component={Authentication} />
    </Switch>
  );
};

export default connect()(withRouter(Routes))
