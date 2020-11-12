import { all, call } from "redux-saga/effects";
import formDataSaga from "./formDataSagas";

export default function* rootSaga() {
  yield all([call(formDataSaga)]);
}
