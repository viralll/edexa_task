import React from "react";
import { useHistory } from "react-router-dom";

const Error = () => {
  const history = useHistory();

  return (
    <>
      {/* error Page */}
      <div className="container">
        <div className="error d-flex flex-column justify-content-lg-center align-items-center">
          <h4>404 Error ! Page Not Found </h4>
          <button className="btn btn-primary" onClick={() => history.push("/")}>
            Redirect to Login Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
