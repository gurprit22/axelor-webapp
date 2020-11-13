import axios from "axios";
import { BASE_URL } from "../../constants";
import getCookie from "../../utils";

export const SaleOrderApi = {};

SaleOrderApi.getOrders = async (body) => {
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");

    const res = await axios.post(
      `${BASE_URL}ws/rest/com.axelor.apps.sale.db.SaleOrder/search`,
      body
    );

    return res ? res : null;
  } catch (err) {
    console.error(err);
  }
};

SaleOrderApi.fetchOrder = async (id, body) => {
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");

    const res = await axios.post(
      `${BASE_URL}ws/rest/com.axelor.apps.sale.db.SaleOrder/${id}/fetch`,
      body
    );

    return res ? res : null;
  } catch (err) {
    console.error(err);
  }
};


SaleOrderApi.createOrder = async (body) => {
    
}