"use client";
import "./layout.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/lib/redux/slices/loaderSlice";

const Layout = ({ children }: any) => {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return <div className="inner-layout">{children}</div>;
};

export default Layout;
