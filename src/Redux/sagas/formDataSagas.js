import { takeLatest, call, all } from "redux-saga/effects";
import axios from "axios";
import getCookie from "../../utils";
import { formDataActionTypes } from "../actions/formData/action.types";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["X-CSRF-Token"] = getCookie("CSRF-TOKEN");

const BASE_URL = `http://localhost:5000/`;

function* onGetCurrency() {
  const body = {
    data: { _domainContext: {} },
    fields: ["id", "name", "code"],
    limit: 10,
    offSet: 0,
    sortBy: null,
  };
  try {
    const res = yield axios.post(
      `${BASE_URL}ws/rest/com.axelor.apps.base.db.Currency/search`,
      body
    );
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

function* getCurrency() {
  yield takeLatest(formDataActionTypes.GET_CURRENCY, onGetCurrency);
}

export default function* formDataSaga() {
  yield all([call(getCurrency)]);
}
