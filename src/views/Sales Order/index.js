import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  Container,
  Card,
  Typography,
  CardContent,
  Box,
  Chip,
  CircularProgress 
} from "@material-ui/core";
import getCookie from "../../utils";
import { fetchBody } from "../Sales Order Listing/payload";
import { getCurrency } from "../../Redux/actions/formData/actions";

const useStyles = makeStyles(() => ({
  root: {
    padding: "2em 5em",
  },
  card: {
    minHeight: "90vh",
  },
  rowSpace: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2em",
  },
  columGap: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3em",
    marginBottom: "2em"
  },
}));

export default function SaleOrderView({ match }) {
  const [data, setData] = useState({ });
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");
  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/ws/rest/com.axelor.apps.sale.db.SaleOrder/${match.params.orderId}/fetch`,
        fetchBody,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setData(res.data.data[0]);
        }
      });
      dispatch(getCurrency());
  }, []);
  const classes = useStyles();
  const {
    company,
    currency,
    clientPartner,
    saleOrderSeq,
    mainInvoicingAddress,
    deliveryAddress,
    totalCostPrice,
    totalGrossMargin,
  } = data;
  return (
    <>  
    <Container maxWidth={false} className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <CardContent>
          <Typography color="textSecondary" align="center" variant="h4">
            {`Sale Order ${saleOrderSeq}`}
          </Typography>
          <Box mt={3}>
            <Box className={classes.columGap} width="12em">
              <Chip
                color="primary"
                label={`Toal Cost price ${totalCostPrice} ${currency.symbol}`}
              />
              <Chip
                color="primary"
                label={`Toal Gross margin ${totalGrossMargin} ${currency.symbol}`}
              />
            </Box>
            <Box className={classes.rowSpace} width="80%">
              <Typography>{`Company: ${company?.name}`}</Typography>
              <Typography>{`currency: ${currency?.name}`}</Typography>
            </Box>
            <Box>
              <Typography gutterBottom>{clientPartner?.fullName}</Typography>
            </Box>
          </Box>
          <Box className={classes.rowSpace}>
            <Typography>
              {`Main/Invoicing Address:  ${mainInvoicingAddress?.fullName}`}
            </Typography>
            <Typography>
              {`Delivery Address:  ${deliveryAddress?.fullName}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
    </>
  );
}
