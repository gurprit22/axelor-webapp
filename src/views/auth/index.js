import { useState } from "react";
import axios from 'axios';

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

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    backgroundColor: "#dadada",
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
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = () => {
    // const data = new FormData();
    // data.append("username", auth.username);
    // data.append("password", auth.password);  
    axios.post('http://localhost:5000/callback',auth,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res.data);
    });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card className={classes.root}>
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
