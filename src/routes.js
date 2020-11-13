import { Switch, Route, Redirect } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import LoginView from "./views/auth";
import SaleOrderView from "./views/Sales Order";
import SalesOrders from "./views/Sales Order Listing";
import getCookie from "./utils";
import CreateSaleOrder from "./views/Sales Order/createSaleOrder";
import { FormDataProvider } from "./contexts/FormContext";

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={(props) =>
        getCookie("JSESSIONID") ? (
          <Redirect to="/sales" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    <Route exact path="/login" component={LoginView} />
    <FormDataProvider>
      <AuthGuard>
        <Route exact path="/sales" component={SalesOrders} />
        <Route exact path="/sales/view/:orderId" component={SaleOrderView} />
        <Route exact path="/sales/create" component={CreateSaleOrder} />
      </AuthGuard>
    </FormDataProvider>
  </Switch>
);

export default Routes;
