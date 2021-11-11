import React, { useState } from "react";
import PropTypes from 'prop-types';

const Form = ({ submitForm }) => {
  const [location, setLocation] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (!location || location === '') {
      return
    }
    submitForm(location)
    setLocation('')
  };
  return (
    <form className="flex flex-col justify-center p-6">
      <input
        type="text"
        className="p-4 mb-6"
        name="location"
        id="location"
        placeholder="Search for location"
        value={location}
        onChange={e => setLocation(e.target.value.toLowerCase())}
        required
      />
      <button 
        type="submit"
        className="bg-red-100 hover:bg-red-300 transition duration-500 py-4 px-8 rounded-md text-red-900"
        onClick={onSubmit}
      >
        SEARCH
      </button>
    </form>
  );
};

Form.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

export default Form;
