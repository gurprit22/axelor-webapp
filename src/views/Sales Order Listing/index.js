import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  makeStyles,
  Box,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { body } from "./payload";
import SalesOrderCard from "../../components/SalesOrderCard";
import getCookie from "../../utils";


const useStyles = makeStyles(() => ({
  root: {
    padding: "2em 10em",
    textAlign: "center",
  },
}));

const SalesOrders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/ws/rest/com.axelor.apps.sale.db.SaleOrder/search",
        body,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.data);
        }
      });
    axios
      .get(
        "http://localhost:5000//ws/meta/fields/com.axelor.apps.sale.db.SaleOrder"
      )
      .then((res) => {
        const required = res.data.data.fields.filter(
          (field) => field.required === true
        );
      });
  }, []);
  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography color="textPrimary" align="center" variant="h3">
        Sales Orders
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" size="large" color="secondary" onClick={() => history.push("sales/create")}>
          CREATE ORDER
        </Button>
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item sm={4} key={order.id}>
              <SalesOrderCard data={order} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SalesOrders;
