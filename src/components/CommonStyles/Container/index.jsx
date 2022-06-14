import React from "react";
import { Container as ContainerMUI } from "@mui/material";

const MARGIN_CONTAINER = 40;

const Container = (props) => {
  return (
    <ContainerMUI
      style={{ marginTop: MARGIN_CONTAINER, marginBottom: MARGIN_CONTAINER }}
      {...props}
    />
  );
};

export default React.memo(Container);
