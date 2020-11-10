import { Switch, Route } from "react-router-dom";
import LoginView from "./views/auth";


const Routes = () => (
  <Switch>
      <Route to='/' component={LoginView} />
  </Switch>
);

export default Routes;