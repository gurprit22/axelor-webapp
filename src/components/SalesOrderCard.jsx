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
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
  },
}));

export default function SalesOrderCard({ data }) {
  const classes = useStyles();
  const {
    saleOrderSeq,
    orderDate,
    exTaxTotal,
    inTaxTotal,
    stockLocation,
  } = data;
  return (
    <Card className={classes.Card} elevation={3}>
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
            <Typography>{`WT :${exTaxTotal}`}</Typography>
            <Typography>{`ATI :${inTaxTotal}`}</Typography>
          </Box>
        </Box>
        <Typography>{stockLocation.name}</Typography>
      </CardContent>
    </Card>
  );
}
