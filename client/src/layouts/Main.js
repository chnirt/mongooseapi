import React from "react";
import "./Main.css";
import HeaderLayout from "./HeaderLayout";
import SiderLayout from "./SiderLayout";
import FooterLayout from "./FooterLayout";

const Main = ({ children }) => {
  return (
    <>
      <HeaderLayout />
      {/* <Layout> */}
      <SiderLayout />
      {children}
      {/* </Layout> */}
      <FooterLayout />
    </>
  );
};

export default Main;
