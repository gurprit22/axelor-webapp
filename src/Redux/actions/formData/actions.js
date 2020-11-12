import { formDataActionTypes } from "./action.types";

export const getCurrency = () => ({
  type: formDataActionTypes.GET_CURRENCY,
});

export const getCurrencySuccess = (currency) => ({
  type: formDataActionTypes.GET_CURRENCY_SUCCESS,
  payload: currency,
});

export const getUnit = () => ({
  type: formDataActionTypes.GET_UNIT,
});

export const getUnitSuccess = (unit) => ({
  type: formDataActionTypes.GET_UNIT_SUCCESS,
  payload: unit,
});
