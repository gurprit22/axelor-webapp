import { createContext, useState, useEffect } from "react";
import axios from "axios";
import getCookie from "../../utils";
import { currencyBody } from "./apiBody";
import { BASE_URL } from "../../constants/index";

export const FormDataContext = createContext({
  currency: [],
});

export const FormDataProvider = ({ children }) => {
  const [currency, setCurrency] = useState();

  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");

  useEffect(() => {
    async function getCurrency() {
      const res = await axios.post(
        `${BASE_URL}ws/rest/com.axelor.apps.base.db.Currency/search`,
        currencyBody
      );
      console.log(res);
      if (res.status === 200) {
        setCurrency(res.data.data);
      }
    }

    getCurrency();
  }, []);

  return (
    <FormDataContext.Provider value={{ currency }}>
      {children}
    </FormDataContext.Provider>
  );
};
