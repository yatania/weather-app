import React from "react";
import PropTypes from 'prop-types';

const Error = ({ message, submitError }) => (
  <div className="bg-gray-100 p-6 text-xl text-red-600 rounded-md shadow-xl m-4">
    {message}
    <button className="bg-red-100 hover:bg-red-300 transition duration-500 py-2 px-6 ml-1 rounded-md text-red-900" onClick={submitError}>
      Ok
    </button>
  </div>
);

Error.propTypes = {
  message: PropTypes.string,
  submitError: PropTypes.func.isRequired
}

Error.defaultProps = {
  message: 'Ooops... An error occurred'
}

export default Error;