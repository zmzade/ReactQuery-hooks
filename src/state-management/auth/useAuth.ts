import React from "react";
import AuthContext from "./authContext";

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
