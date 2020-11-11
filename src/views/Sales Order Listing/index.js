import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  makeStyles,
  Box,
  Typography,
  Grid,
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
  const classes = useStyles();
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");
  useEffect(() => {
    // axios.get('http://localhost:5000/ws/meta/fields/com.axelor.apps.sale.db.SaleOrder',{
    //     withCredentials: true
    // }).then(res => console.log(res.data));
    axios
      .post(
        "http://localhost:5000/ws/rest/com.axelor.apps.sale.db.SaleOrder/search",
        body,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data); 
        if (res.status === 200) {
          setOrders(res.data.data);
        }
      });
  }, []);
  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography color="textPrimary" align="center" variant="h3">
        Sales Orders
      </Typography>
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


