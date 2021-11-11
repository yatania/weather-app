import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid'

const Forecast = ({ forecast }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const newCity = {
      id: uuidv4(),
      title: forecast.location,
      temperature: forecast.temperature,
      date: forecast.date,
      image: forecast.weatherIcon
    }

    const newlist = [newCity, ...list];

    setList(newlist);
  }, [forecast]);

  const remove = id => {
    const newList = [...list].filter((city) => city.id !== id);

    setList(newList)
  }

  return (
    <ul className="border-red-100 rounded flex flex-col items-center justify-center p-6">
      {list.map((city) => (
      <li className="text-xl mb-4 flex items-center" key={city.id}>
        <img 
          src={city.image}
          alt="weather icon"
          className="w-12 h-12 mr-6"
        />
        {city.title} | {city.date} | {city.temperature} (st C)
        <button onClick={() => remove(city.id)} className="text-red-900 ml-5">x</button>
      </li>
    ))}
    </ul>
  )
};

Forecast.propTypes = {
  forecast: PropTypes.shape({
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    weatherIcon: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
  }),
};

export default Forecast;