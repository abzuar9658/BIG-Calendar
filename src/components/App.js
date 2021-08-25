import React, { useState, useEffect, useRef } from "react";
import Holidays from "./Holidays";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { loadEvents, loadCountries } from "../actions";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { getCode } from "country-list";

const generateArrayOfYears = () => {
  var max = new Date().getFullYear();
  var min = max - 100;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push({ value: i });
  }
  return years;
};

const App = () => {
  let countriesRef = useRef(false);
  //Redux Hooks
  const events = useSelector((state) => state.events);
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  //App states
  const [year, setYear] = useState(2021);
  const [country, setCountry] = useState("Pakistan");

  //Runs only first time to get supportedc ountries and their codes
  useEffect(() => {
    dispatch(loadCountries());
    countriesRef = true;
  }, [countriesRef]);

  //Only run on year or country change
  useEffect(() => {
    dispatch(
      loadEvents({
        country: getCode(country),
        year,
      })
    );
  }, [year, country]);

  return (
    <div className="container">
      <h1>Calendar with Events</h1>
      {countries && countries.isSuccess === true ? (
        <div className="dropdown">
          <div className="dropdown">
            <p>Select Country: </p>
            <Dropdown
              options={countries.data}
              onChange={(event) => {
                setCountry(event.value);
              }}
              value={country}
              placeholder="Select an option"
            />
          </div>
          <div className="dropdown">
            <p>Select Year: </p>
            <Dropdown
              options={generateArrayOfYears()}
              onChange={(event) => {
                setYear(event.value);
              }}
              value={year.toString()}
              placeholder="Select an option"
            />
          </div>
        </div>
      ) : null}

      {events && events.isLoading === true ? (
        <div>
          <ClipLoader color={"black"} loading={events.isLoading} size={150} />
          <p>Loading...</p>
        </div>
      ) : null}
      {events && events.isLoading !== true && events.isSuccess === true ? (
        <div>
          <Holidays events={events.data} />
        </div>
      ) : null}
      {events && events.isError === true ? (
        <div>
          <p>{events.errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
};

export default App;
