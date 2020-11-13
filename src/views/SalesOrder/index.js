import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Card,
  Typography,
  CardContent,
  Box,
  Chip,
  CircularProgress,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import getCookie from "../../utils";
import { fetchBody } from "../SalesOrderListing/payload";
import { SaleOrderApi } from "../../api/saleOrder";

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
    marginBottom: "2em",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function SaleOrderView({ match }) {
  const [data, setData] = useState({});
  const history = useHistory();
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");
  const orderId = match.params.orderId;
  useEffect(() => {
    SaleOrderApi.fetchOrder(orderId, fetchBody).then((res) => {
      if (res.status === 200) {
        setData(res.data.data[0]);
      } else {
        // show error notification or some fallback
      }
    });

    // axios
    //   .post(
    //     `http://localhost:5000/ws/rest/com.axelor.apps.sale.db.SaleOrder/${orderId}/fetch`,
    //     fetchBody,
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setData(res.data.data[0]);
    //     }
    //   });
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
              <Box className={classes.rowSpace}>
                <Box className={classes.columGap} width="12em">
                  <Chip
                    color="primary"
                    label={`Toal Cost price ${totalCostPrice} ${currency?.symbol}`}
                  />
                  <Chip
                    color="primary"
                    label={`Toal Gross margin ${totalGrossMargin} ${currency?.symbol}`}
                  />
                </Box>
                <Box>
                  <Link to={`/sales/edit/${orderId}`} className={classes.link}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<EditIcon />}
                    >
                      Edit Order
                    </Button>
                  </Link>
                </Box>
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
