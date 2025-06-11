"use client";
import "./style.scss";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { Circles } from "react-loader-spinner";
import { useSelector } from "react-redux";

/**LOADER COMPONENTS */
const Loader = () => {
  /**GET STATES FROM STORE */
  const isLoading = useSelector((state: RootState) => state?.reducers?.loading);

  /**IF isLoading IS TRUE SHOW LOADER*/
  if (isLoading?.loading) {
    return (
      <div className="overlayloader">
        <Circles
          height="80"
          width="80"
          color="#0080D0"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass="something"
          visible={true}
        />
      </div>
    );
  } else {
    return <React.Fragment />;
  }
};

export default Loader;
