import React, { useState, createContext } from "react";

const ApiErrorContext = createContext({
  error: 0,
  setErrorCode: statusCode => {}
});

export const ApiErrorProvider = props => {
  const [error, setError] = useState(0);

  const setErrorCode = statusCode => {
    if (error) {
      return;
    }
    setError(statusCode);
  };

  return (
    <ApiErrorContext.Provider value={{ error, setErrorCode }}>
      {props.children}
    </ApiErrorContext.Provider>
  );
};

export const useApiError = () => {
  const context = React.useContext(ApiErrorContext);
  return context;
};
