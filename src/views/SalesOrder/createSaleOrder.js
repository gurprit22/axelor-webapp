import { useContext } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  makeStyles,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Button,
} from "@material-ui/core";
import { FormDataContext } from "../../contexts/FormContext/index";
import getCookie from "../../utils";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
  content: {
    padding: "2em 15em",
  },
}));

export default function CreateSaleOrder() {
  const classes = useStyles();
  const { currency } = useContext(FormDataContext);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");

  const handleCreateOrder = async (values) => {
    const body = {
      action: "save,action-sale-group-confirmed",
      model: "com.axelor.apps.sale.db.SaleOrder",
      data: {
        context: {
          ...values,
          _model: "com.axelor.apps.sale.db.SaleOrder",
          _signal: "confirmOrderBtn",
          _template: false,
          _internalUser: 1,
          _elementStartDate: new Date().toISOString(),
          _id: null,
          _myActiveTeam: {
            code: "GRL",
            id: 4,
            name: "General",
          }
        },
      },
    };


    const res = await axios.post(`http://localhost:5000/ws/action`,body);
    if(res.status === 200){
      alert("Order Confirmed");
    }else{
      alert("Something went wrong");
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        currency: "",
        creationDate: new Date().toISOString().slice(0, 10),
        deliveryAddressStr: "",
        mainInvoicingAddressStr: "",
        team: { code: "GRL", name: "General", id: 4 },
        saleOrderTypeSelect: "",
        company: {
          code: "AXE",
          name: "Axelor",
          currency: { code: "EUR", name: "Euro", id: 46 },
          id: 1,
        },
        team: {
          code: "GRL",
          name: "General",
          id: 4,
        },
      }}
      validationSchema={Yup.object().shape({
        deliveryAddressStr: Yup.string().required("Required"),
        mainInvoicingAddressStr: Yup.string().required("Required"),
        saleOrderTypeSelect: Yup.number().required("Required"),
      })}
      onSubmit={(values) => {
        //console.log(values);
        handleCreateOrder(values); 
      }}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card className={classes.root} elevation={0}>
            <CardContent className={classes.content}>
              <Typography variant="h5" align="center" gutterBottom>
                Create Sales Order
              </Typography>
              <Box mt={3}>
                <Grid container spacing={3} justify="center">
                  <Grid item sm={5}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      select
                      type="string"
                      name="currency"
                      InputLabelProps={{ shrink: true }}
                      label="Currency"
                      value={values.currency}
                    >
                      {currency.map((c) => (
                        <MenuItem value={c} key={c.code}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item sm={5}>
                    <TextField
                      fullWidth
                      select
                      type="string"
                      onChange={handleChange}
                      label="Order Type"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      name="saleOrderTypeSelect"
                      value={values.saleOrderTypeSelect}
                      error={Boolean(
                        touched.saleOrderTypeSelect &&
                          errors.saleOrderTypeSelect
                      )}
                      helperText={
                        touched.saleOrderTypeSelect &&
                        errors.saleOrderTypeSelect
                      }
                    >
                      <MenuItem value={1}>Standard</MenuItem>
                      <MenuItem value={2}>Subscription</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item sm={5}>
                    <TextField
                      fullWidth
                      label="Invoicing Address"
                      name="mainInvoicingAddressStr"
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="string"
                      variant="outlined"
                      rows={4}
                      InputLabelProps={{ shrink: true }}
                      value={values.mainInvoicingAddressStr}
                      error={Boolean(
                        touched.mainInvoicingAddressStr &&
                          errors.mainInvoicingAddressStr
                      )}
                      helperText={
                        touched.mainInvoicingAddressStr &&
                        errors.mainInvoicingAddressStr
                      }
                    />
                  </Grid>
                  <Grid item sm={5}>
                    <TextField
                      fullWidth
                      label="Delivery Address"
                      name="deliveryAddressStr"
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="string"
                      variant="outlined"
                      rows={4}
                      InputLabelProps={{ shrink: true }}
                      value={values.deliveryAddressStr}
                      error={Boolean(
                        touched.deliveryAddressStr && errors.deliveryAddressStr
                      )}
                      helperText={
                        touched.deliveryAddressStr && errors.deliveryAddressStr
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box display="flex" justifyContent="flex-end" p="2em 5em">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
}
