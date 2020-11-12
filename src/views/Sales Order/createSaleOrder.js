import { Formik } from "formik";
import { useSelector } from "react-redux";
import {
  makeStyles,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  Button,
} from "@material-ui/core";

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
  const { currency } = useSelector((state) => state.formData);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        currency: "",
      }}
      onSubmit={(values) => {
        console.log(values);
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
                <Grid container spacing={3}>
                  <Grid item sm={4}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      select
                      type="string"
                      name="currency"
                      SelectProps={{ native: true }}
                      label="Currency"
                    >
                      <option>Select</option>
                      {currency.map((c) => (
                        <option value={c.id} key={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
              <Box display="flex" justifyContent="flex-end">
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
