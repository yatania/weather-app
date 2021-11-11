import React, { Fragment, useState } from "react";

import axios from "axios";

import Error from "../Error/Error";
import Forecast from "../Forecast/Forecast";
import Form from "../Form/Form";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

import REQUEST_URL from "../../helpers/api";
import getCurrentDay from "../../helpers/getCurrentDay";

const Page = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [forecast, setForecast] = useState(null);

  const getWoeid = async location => {
    const { data } = await axios(`${REQUEST_URL}/search`, {params: { query: location }});

    if (!data || data.length === 0) {
      setError('There is no such location!');
      setLoading(false);
      return;
    }

    return data[0];
  }

  const getForecastData = async woeid => {
    const { data } = await axios(`${REQUEST_URL}/${woeid}`);

    if (!data || data.length === 0) {
      setError('Something went wrong!');
      setLoading(false);
      return;
    }

    return data
  }

  const collectedForecastData = (data) => {
    const currentDay = getCurrentDay(data.consolidated_weather[0], data.title);

    setForecast(currentDay);
    setLoading(false);
  }

  const submitRequest = async location => {
    setLoading(true);
    setError(false);
    const response = await getWoeid(location);

    if (!response?.woeid) {
      return;
    }
    const data = await getForecastData(response.woeid);

    if (!data) {
      return;
    }

    collectedForecastData(data);
  }

  const submitError = () => {
    setError(false)
  }

  const onSubmit = value => {
    setLoading(true)
    submitRequest(value)
  }

  return (
    <Fragment>
      <Header />
      <div className="bg-white rounded-md shadow-xl w-96 mb-10">
        {!isLoading && <Form submitForm={onSubmit}/>}
      </div>
      <div className="bg-white rounded-md shadow-xl w-96">
        {isError && <Error message={isError} submitError={submitError}/>}
        {isLoading && <Loader />}
      </div>
      {forecast && <Forecast forecast={forecast}/>}
    </Fragment>
  );
};

export default Page;
