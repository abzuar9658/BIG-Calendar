import * as actionTypes from "./types";
import axios from "axios";

export const dataLoading = () => {
  return {
    type: actionTypes.DATA_LOADING,
  };
};

export const loadEvents = (body) => async (dispatch) => {
  const { country, year } = body;
  dispatch(dataLoading());
  try {
    const res = await axios.get(
      `https://calendarific.com/api/v2/holidays?&api_key=b4fa41a42b11bb140eb362cfcf4a56066c033896&country=${country}&year=${year}`
    );
    if (res.data === undefined) throw new Error("No data found!");
    dispatch({
      type: actionTypes.DATA_LOAD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DATA_LOAD_FAIL,
      payload: error.message,
    });
  }
};

export const countiresLoading = () => {
  return {
    type: actionTypes.COUNTRIES_LOADING,
  };
};

export const loadCountries = () => async (dispatch) => {
  dispatch(countiresLoading());
  try {
    const res = await axios.get(
      `https://calendarific.com/api/v2/countries?api_key=b4fa41a42b11bb140eb362cfcf4a56066c033896`
    );
    console.log("COUNTRY IN ACTION:  ", res.data.response.countries);
    const countries = res.data.response.countries.map((country) => ({
      label: country.country_name,
    }));
    dispatch({
      type: actionTypes.COUNTRIES_LOAD_SUCCESS,
      payload: countries,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.COUNTRIES_LOAD_FAIL,
      payload: error.message,
    });
  }
};
