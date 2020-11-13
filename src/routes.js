import { Switch, Route, Redirect } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import LoginView from "./views/auth";
import SaleOrderView from "./views/SalesOrder";
import SalesOrders from "./views/SalesOrderListing";
import getCookie from "./utils";
import CreateSaleOrder from "./views/SalesOrder/createSaleOrder";
import { FormDataProvider } from "./contexts/FormContext";
import EditSaleOrder from "./views/SalesOrder/editSaleOrder";

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
        <Route exact path="/sales/edit/:id" component={EditSaleOrder} />
      </AuthGuard>
    </FormDataProvider>
  </Switch>
);

export default Routes;
