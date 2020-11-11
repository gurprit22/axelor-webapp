import { useHistory, useRouteMatch } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#C0C0C0",
    },
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
  },
}));

export default function SalesOrderCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    saleOrderSeq,
    orderDate,
    exTaxTotal,
    inTaxTotal,
    stockLocation,
  } = data;
  const handleClick = () => {
    history.push(`${match.path}/${data.id}`);
  };
  return (
    <Card className={classes.root} elevation={3} onClick={handleClick}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom>{saleOrderSeq}</Typography>
          <Typography gutterBottom>{orderDate}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom>{data["clientPartner.fullName"]}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box className={classes.flexColumn}>
            <Chip label="Invoiced" color="primary" />
            <Chip label="Not Delivered" color="secondary" />
            <Chip label="Axelor" color="primary" />
          </Box>
          <Box className={classes.flexColumn}>
            <Typography>{`WT :${exTaxTotal} ${data["currency.symbol"]}`}</Typography>
            <Typography>{`ATI :${inTaxTotal} ${data["currency.symbol"]}`}</Typography>
          </Box>
        </Box>
        <Typography>{stockLocation.name}</Typography>
      </CardContent>
    </Card>
  );
}
