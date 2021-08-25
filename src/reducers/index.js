import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initial_state = {
  data: [],
  isLoading: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
};

const eventsReducer = (state = initial_state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.DATA_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DATA_LOAD_SUCCESS:
      return {
        ...state,
        data: payload.response.holidays,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.DATA_LOAD_FAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

const countriesReducer = (state = initial_state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COUNTRIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.COUNTRIES_LOAD_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case actionTypes.COUNTRIES_LOAD_FAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  events: eventsReducer,
  countries: countriesReducer,
});

export default rootReducer;
