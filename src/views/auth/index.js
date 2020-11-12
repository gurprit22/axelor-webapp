import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Container,
  Box,
  TextField,
  CardHeader,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { getCurrency } from "../../Redux/actions/formData/actions";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
  },
  container: {
    padding: "2em 4em",
    textAlign: "center",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  btn: {
    textTransform: "none",
  },
}));

function LoginView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/callback", auth, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then((res) => {
        const cookie = res.headers.cookie.split(";");
        document.cookie = cookie[0];
        document.cookie = cookie[cookie.length - 1];
        if (res.status === 200) {
          // dispatch(getCurrency());
          history.push("/sales");
        }
      });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card className={classes.root} elevation={3}>
        <CardHeader title="Aexlor Login" />
        <CardContent>
          <Box className={classes.fieldContainer}>
            <TextField
              name="username"
              value={auth.username}
              type="string"
              onChange={handleChange}
              variant="outlined"
              placeholder="username"
            />
            <TextField
              name="password"
              value={auth.password}
              type="password"
              onChange={handleChange}
              variant="outlined"
              placeholder="password"
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              size="large"
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginView;
