import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import AuthContextProvider from "../../context/AuthContextProvider";

const Layout = (props) => {
  return (
    <Fragment>
      <AuthContextProvider>
        <MainNavigation />
        <main>{props.children}</main>
      </AuthContextProvider>
    </Fragment>
  );
};

export default Layout;
