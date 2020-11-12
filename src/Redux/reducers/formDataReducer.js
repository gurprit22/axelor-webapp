import { formDataActionTypes } from "../actions/formData/action.types";

const initial_state = {
  currency: [],
  unit: [],
};

export default function formDataReducer(state = initial_state, action) {
  switch (action.type) {
    case formDataActionTypes.GET_CURRENCY_SUCCESS:
      return {
        ...state,
        currency: action.payload
      }
    default:
      return state;
  }
}
