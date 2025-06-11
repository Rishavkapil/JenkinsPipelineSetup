/** @format */

"use client";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useBuyWithFiatMutation,
  useCreateOrderMutation,
  useLazyGetTokenPriceQuery,
} from "@/services/rtk.api.service";
import dynamic from "next/dynamic";
const OtpModalBuy = dynamic(() => import("./otpModal"), { ssr: false });
import BigNumber from "bignumber.js";
import { bn_operations } from "@/services/common.service";
import { DECIMAL, RESPONSES, TOKEN_NAME, TOKEN_SYMBOL } from "@/constants";
import { transformNumber } from "@/constants/utils";
import { CurrencyType, PropsType } from "@/interfaces/user";
import { Button, CommonModal, CustomSelect, Input } from "@/common";
import "./style.scss";

type valuesType = { coin: string; token: string };

const BuyModal = (props: PropsType) => {
  const {
    showBuy,
    handleCloseBuy,
    refetchWalletBalance,
    mergedCoinData,
    phaseDetails,
    selectedWallet,
  } = props;
  const { minBuy, maxBuy } = (phaseDetails && phaseDetails) || {};
  const [createOrder] = useCreateOrderMutation();
  const [buyWithFiat] = useBuyWithFiatMutation();
  const [triggerGetTokenPrice, { data }] = useLazyGetTokenPriceQuery();
  const [tokenValue, setTokenValue] = useState<number>(0);
  const tokenValueRef = useRef(tokenValue);
  const [currencyType, setCurrencyType] = useState<CurrencyType | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [walletOptions, setWalletOptions] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const filteredCoinData = mergedCoinData?.filter(
      (wallet: any) => wallet?.coin !== "token"
    );
    setWalletOptions(
      filteredCoinData?.map((wallet: any) => ({
        value: wallet?.coin,
        label: wallet?.coin.toUpperCase(),
      }))
    );
  }, [mergedCoinData]);

  const updateValidationSchema = (balance: any) =>
    Yup.object().shape({
      coin: Yup.number()
        .required("Required")
        .test(
          "max-balance",
          "Amount should be greater than zero",
          function (value) {
            return value > 0;
          }
        )
        .test("max-balance", "Insufficient balance", function (value) {
          if (!currencyType?.is_crypto) {
            return true;
          }
          return value <= balance / DECIMAL;
        })
        .test(
          "integer",
          "Decimals are not allowed for this currency.",
          function (value) {
            if (!currencyType?.is_crypto) {
              return Number.isInteger(value);
            }
            return true;
          }
        ),
    });

  const [showOtp, setShowOtp] = useState(false);

  const handleCloseOtp = () => setShowOtp(false);
  const handleShowOtp = () => setShowOtp(true);

  const calculateTokenValue = async (
    coinValue: number,
    currency: CurrencyType | null
  ) => {
    if (currency && data) {
      const usdtData = data?.data?.find(
        (coinData: any) => coinData?.coin === "usdc" || "usd"
      );
      if (currency?.coin === "usdc" || currency?.coin === "usd") {
        if (usdtData) {
          const tokenPrice: BigNumber = new BigNumber(usdtData?.tokenPrice);
          const coinValueBN = new BigNumber(coinValue);
          const result = await bn_operations(coinValueBN, tokenPrice, "/");
          setTokenValue(Number(result));
          tokenValueRef.current = Number(result);
          setTokenPrice(Number(tokenPrice));
        }
      } else {
        const selectedCoinData = data?.data?.find(
          (coinData: any) => coinData?.coin === currency?.coin
        );
        if (selectedCoinData) {
          const coinPrice = new BigNumber(selectedCoinData?.coin_price);
          const tokenPrice = new BigNumber(selectedCoinData?.tokenPrice);
          const coinValueBN = new BigNumber(coinValue);
          const totalToken = await bn_operations(
            coinValueBN,
            coinPrice,
            "*"
          ).then((result) => bn_operations(result, tokenPrice, "/"));
          setTokenValue(Number(totalToken));
          tokenValueRef.current = Number(totalToken);
          setTokenPrice(Number(tokenPrice));
        }
      }
    }
  };

  const handleCoinChange = (val: string) => {
    const coinValue = Number(val);
    calculateTokenValue(coinValue, currencyType);
  };

  const setCoinData = (data: CurrencyType) => {
    setCurrencyType(data);
    setTokenValue(0);
    tokenValueRef.current = 0;
    calculateTokenValue(Number(values.coin), data);
  };

  useEffect(() => {
    const fetchInitialTokenPrice = async () => {
      const tokenPriceData = await triggerGetTokenPrice("").unwrap();
      const usdtData = tokenPriceData?.data?.[0];
      if (usdtData) {
        setTokenPrice(Number(usdtData.tokenPrice));
      }
    };
    fetchInitialTokenPrice();
  }, []);

  useEffect(() => {
    if (currencyType) {
      calculateTokenValue(Number(values.coin), currencyType);
    }
  }, [data, currencyType]);

  const handleBuySubmit = async (values: valuesType) => {
    if (currencyType?.is_crypto) {
      try {
        const dataBody = {
          amount: values.coin,
          coin: currencyType?.coin.toUpperCase(),
        };
        const response = await createOrder(dataBody);
        if (response?.data?.status === RESPONSES.SUCCESS) {
          setOrderData(response?.data?.data);
          handleCloseBuy();
          handleShowOtp();
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const dataBody = {
          amount: values.coin,
          coin: currencyType?.coin.toUpperCase(),
        };
        const response = await buyWithFiat(dataBody);
        if (response?.data?.status === RESPONSES.SUCCESS) {
          window.open(response?.data?.data?.paymentlink, "_self");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const {
    values,
    resetForm,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      coin: "",
      token: "",
    },
    validationSchema: updateValidationSchema(currencyType?.balance),
    onSubmit: async (values: valuesType) => {
      setIsButtonDisabled(true);
      handleBuySubmit(values);
      setTimeout(() => setIsButtonDisabled(false), 3000);
    },
  });

  useEffect(() => {
    if (!showBuy) {
      resetForm();
      setTokenValue(0);
      tokenValueRef.current = 0;
      setCurrencyType(null);
      setTokenPrice(0);
    }
  }, [showBuy]);

  useEffect(() => {
    calculateTokenValue(Number(values.coin), currencyType);
  }, [values.coin]);

  useEffect(() => {
    if (selectedWallet?.coin === "token") {
      const maticWallet: any = mergedCoinData?.find(
        (wallet: any) => wallet.coin === "eth"
      );
      setCurrencyType(maticWallet);
    } else {
      setCurrencyType(selectedWallet);
    }
  }, [showBuy, mergedCoinData]);

  useEffect(() => {
    setFieldValue("token", transformNumber(tokenValue));
  }, [tokenValue, setFieldValue]);

  return (
    <>
      <CommonModal
        title={`Buy ${TOKEN_NAME}`}
        backdrop="static"
        show={showBuy}
        onHide={handleCloseBuy}
        className="buy-modal"
      >
        <form onSubmit={handleSubmit} autoComplete="on">
          {currencyType?.coin ? (
            <p className="buy-modal__bal">
              Wallet Balance:{" "}
              <span>
                {currencyType
                  ? `  ${currencyType?.balance / DECIMAL} ${currencyType?.coin?.toLocaleUpperCase()}`
                  : "0.00"}
              </span>
            </p>
          ) : null}
          <div className="price-conv">
            <h5>
              1 {TOKEN_SYMBOL} = <span>{tokenPrice} USD</span>
            </h5>
          </div>
          <Row>
            <Col xs={6}>
              <Input
                label="Amount"
                placeholder="Enter Amount"
                id="coin"
                name="coin"
                type="number"
                autoFocus
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(event);
                  handleCoinChange(event.target.value);
                }}
                value={values.coin}
                maxLength={7}
                isInvalid={touched.coin && !!errors.coin}
                error={touched.coin && errors.coin}
              />
            </Col>
            <Col xs={6}>
              <CustomSelect
                label="Select Currency"
                defaultValue={{
                  value:
                    selectedWallet?.coin === "token"
                      ? "ETH"
                      : selectedWallet?.coin?.toUpperCase(),
                  label:
                    selectedWallet?.coin === "token"
                      ? "ETH"
                      : selectedWallet?.coin?.toUpperCase(),
                }}
                options={walletOptions}
                // options={selectedWallet?.coin === "token" ? walletOptions : []}
                onChange={(option: any) => {
                  const selectedCurrency = mergedCoinData?.find(
                    (wallet: any) => wallet?.coin === option.value
                  );
                  setCoinData(selectedCurrency);
                }}
                // menuIsOpen={false}
              />
            </Col>
            <Col xs={12}>
              <Input
                label="Token Receive"
                placeholder="Token"
                id="token"
                name="token"
                onChange={handleChange}
                type="number"
                readOnly
                maxLength={10}
                required={"false"}
                value={transformNumber(tokenValue)}
                error={touched?.token && errors?.token}
              />
            </Col>
            <Col xs={12}>
              <p>
                You can purchase Minimum {minBuy || "1"} and Maximum{" "}
                {maxBuy || "10000"} {TOKEN_NAME}
              </p>
              <Button
                text="Buy"
                disabled={isButtonDisabled}
                type="submit"
                className="w-100"
              />
            </Col>
          </Row>
        </form>
      </CommonModal>
      <OtpModalBuy
        showOtp={showOtp}
        handleCloseOtp={handleCloseOtp}
        orderData={orderData}
        refetchWalletBalance={refetchWalletBalance}
      />
    </>
  );
};

export default BuyModal;
