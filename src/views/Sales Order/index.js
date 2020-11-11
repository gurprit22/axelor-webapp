import { useEffect } from 'react';
import axios from 'axios';
import { Container, makeStyles, Box, Typography } from "@material-ui/core";
import { body } from './payload';

const useStyles = makeStyles(() => ({
  root: {
    padding: "2em 10em",
    textAlign: "center",
  },
}));

const SalesOrders = () => {
  const classes = useStyles();

  useEffect(() => {
    // axios.get('http://localhost:5000/ws/meta/fields/com.axelor.apps.sale.db.SaleOrder',{
    //     withCredentials: true
    // }).then(res => console.log(res.data));  
    axios.post('http://localhost:5000/ws/rest/com.axelor.apps.sale.db.SaleOrder/search',body,{
        withCredentials: true,
    }).then(res => console.log(res.data));
  }, [])
  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography color="textPrimary" align="center" variant="h3">
        Sales Orders
      </Typography>
    </Container>
  );
};

export default SalesOrders;