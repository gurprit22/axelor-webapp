import { Switch, Route } from "react-router-dom";
import LoginView from "./views/auth";
import SalesOrders from "./views/Sales Order";


const Routes = () => (
  <Switch>
      <Route exact path='/' component={LoginView} />
      <Route path='/sales' component={SalesOrders} />
  </Switch>
);

export default Routes;