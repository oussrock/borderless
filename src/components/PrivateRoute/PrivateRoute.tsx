import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
import { UserRoles } from "../../constants/bindings";

const PrivateRoute = ({ component: Component, bindings, ...rest }) => {
  const location = useLocation();
  const user = useAuth();
  let role = user.user ? user.user.attributes["custom:custom.roles"] : null;

  if (typeof role === "string") {
    role = [role];
  }

  const handleRedirect = () => {
    if (role.includes(UserRoles.ADMIN)) {
      return false;
    }
    let shouldRedirect = bindings && bindings.indexOf(role) === -1;
    // add group logic in also
    return shouldRedirect;
  };

  return (
    <Route
      {...rest}
      render={props => {
        if (!user.loading) {
          if (!user.user) {
            return (
              <Navigate to={{ pathname: "/", state: { from: location } }} />
            );
          } else if (handleRedirect()) {
            return <Navigate to={{ pathname: "/" }} />;
          }
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
