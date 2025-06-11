/** @format */

"use client";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useWithdrawRequestMutation } from "@/services/rtk.api.service";
// import { withdrawModalSchema } from "@/schema/customSchema";
import { DECIMAL, OWNERS_ADDRESS, RESPONSES, TOKEN_SYMBOL } from "@/constants";
import { Button, CommonModal, Input } from "@/common";
import "./style.scss";
import * as Yup from "yup";
import { transformNumber } from "@/constants/utils";
import toaster from "@/common/Toast";

const validateWalletAddress = async (e: any) => {
  if (e.includes("0x") && e.length === 42) {
    return true;
  } else {
    return false;
  }
};
const withdrawModalSchema = (balance: any) =>
  Yup.object().shape({
    amount: Yup.number().required("Required"),
    address: Yup.string().required("Required").test({
      test: validateWalletAddress,
      message: "Please enter valid wallet address",
    }),
  });

const WithddrawModal = (props: any) => {
  const {
    showWithdraw,
    handleCloseWithdraw,
    selectedCoin,
    refetchWalletBalance,
  } = props;
  const [withdrawRequest] = useWithdrawRequestMutation();

  const { values, resetForm, errors, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        amount:
          selectedCoin?.coin === "token"
            ? transformNumber(selectedCoin?.balance / DECIMAL)
            : "",
        coin: "",
        address: "",
      },
      validationSchema: withdrawModalSchema(selectedCoin?.balance),
      enableReinitialize: true,
      onSubmit: async (values) => {
        if (
          values?.address?.toLocaleLowerCase() ===
          OWNERS_ADDRESS?.toLocaleLowerCase()
        ) {
          toaster.error("Owner cannot make withdraw request");
        } else {
          let bodyData = {
            amount: values?.amount,
            coin: selectedCoin?.coin,
            address: values?.address,
          };
          const response = await withdrawRequest(bodyData);
          if (response?.data?.status === RESPONSES.SUCCESS) {
            handleCloseWithdraw();
            resetForm();
            refetchWalletBalance();
          }
        }
      },
    });

  //handling states of buy form when modal closed
  useEffect(() => {
    if (!showWithdraw) {
      resetForm();
    }
  }, [showWithdraw]);

  return (
    <>
      <CommonModal
        backdrop="static"
        show={showWithdraw}
        onHide={handleCloseWithdraw}
        title={`Withdraw OZOT`}
        className="buy-modal"
      >
        <form onSubmit={handleSubmit} autoComplete="on">
          <p className="buy-modal__bal">
            Wallet Balance:{"  "}
            <span>
              {selectedCoin?.balance
                ? `${transformNumber(selectedCoin?.balance / DECIMAL)} ${selectedCoin?.coin === "token" ? TOKEN_SYMBOL : selectedCoin?.coin?.toLocaleUpperCase()}`
                : `0.00 ${selectedCoin?.coin?.toLocaleUpperCase()}`}
            </span>
          </p>
          <Input
            label="Amount"
            placeholder="Enter Amount"
            id="amount"
            name="amount"
            type="number"
            autoFocus
            required={"false"}
            readOnly={selectedCoin?.coin === "token" ? true : false}
            value={values.amount}
            maxLength={15}
            className="my-4"
            isInvalid={touched.amount && !!errors.amount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
            error={touched.amount && errors.amount && <>{errors.amount}</>}
          />
          <Input
            label="Address"
            placeholder="Wallet Address"
            id="address"
            name="address"
            type="text"
            autoFocus
            value={values.address}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event);
            }}
            maxLength={50}
            isInvalid={touched.address && !!errors.address}
            error={touched.address && errors.address && <>{errors.address}</>}
          />
          <Button className="w-100" text="Withdraw OZOT" type="submit" />
        </form>
      </CommonModal>
    </>
  );
};

export default WithddrawModal;
