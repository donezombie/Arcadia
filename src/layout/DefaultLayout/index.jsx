import Footer from "components/Footer";
import Header from "components/Header";
import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => {
  return {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      flex: "1 0 auto",
      width: "100%",
      background: "linear-gradient(to right, #2F80ED, #56CCF2)",
    },
  };
});

const DefaultLayout = (props) => {
  const { children } = props;
  const classes = useStyle();

  return (
    <Fragment>
      <Header />
      <main className={classes.mainContainer}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
