import React from "react";
import Footer from "../component/footer";
import Header from "../component/header";

const MasterLayout = ({ children, showHeaderFooter = true, ...props }) => {
  return (
    <div {...props}>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default MasterLayout;
