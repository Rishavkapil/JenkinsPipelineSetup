"use client";
import React from "react";
import { Button, CommonModal } from "@/common";
import { RESPONSES } from "@/constants";
import { useUserLogoutMutation } from "@/services/rtk.api.service";
import { useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setJwtToken } from "@/lib/redux/slices/tokenSlice";
import { removeIsLogin } from "@/common/CommonCookies/Cookies";

type Props = {
  handleClose: () => void;
  show: boolean;
};

function LogoutModal(props: Props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [userLogout] = useUserLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    const response: any = await userLogout("");
    if (response?.data?.status === RESPONSES.SUCCESS) {
      await dispatch(setJwtToken(""));
      removeIsLogin();
      router.push("/");
      handleClose();
      localStorage.clear();
      router.refresh();
    }
  };
  return (
    <CommonModal
      backdrop="static"
      show={show}
      onHide={() => handleClose()}
      title="Are you sure you want to signout?"
      className="logout_modal"
    >
      <Row>
        <Col xs={6} className="pe-3">
          <Button
            className="w-100 min-w-100"
            text="Yes"
            onClick={() => handleLogout()}
          />
        </Col>
        <Col xs={6} className="ps-3">
          <Button
            className="w-100 min-w-100 outline-btn"
            text="No"
            onClick={() => handleClose()}
          />
        </Col>
      </Row>
    </CommonModal>
  );
}

export default LogoutModal;
