import { Redirect } from "react-router-dom";
import getCookie from "../utils";

export default function AuthGuard({ children }) {
  const authToken = getCookie("JSESSIONID");

  if (authToken) {
    return children;
  }

  return <Redirect to="/" />;
}
