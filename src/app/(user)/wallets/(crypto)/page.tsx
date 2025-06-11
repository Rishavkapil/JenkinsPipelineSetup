/** @format */
"use client";
import { DECIMAL, KYC_STATUS, RESPONSES, TOKEN_SYMBOL } from "@/constants";
import { useEffect, useState } from "react";
import {
  usePhaseDetailsQuery,
  useUserWalletbalanceQuery,
} from "@/services/rtk.api.service";
import React from "react";
import dynamic from "next/dynamic";
import { Button, CustomTable } from "@/common";
import { phaseDetailsType } from "@/interfaces/user";
import { Container } from "react-bootstrap";
import fiatCoin from "../../../../json/fiat-coin.json";
import useCopyClipboard from "@/app/hooks/useCopyToClipboard";
import { CopyIcon } from "@/app/_ui/svg/_svg";
import toaster from "@/common/Toast";
import { useSelector } from "react-redux";
import { transformNumber } from "@/constants/utils";
import { socket } from "@/socket";

const Deposit = dynamic(() => import("./components/Deposit"), { ssr: false });
const BuyModal = dynamic(() => import("./components/BuyModal"), { ssr: false });
const WithddrawModal = dynamic(() => import("./components/Withdraw"), {
  ssr: false,
});

//Table headers
const fields = [
  { label: "SR.NO" },
  { label: "COIN" },
  { label: "BALANCE" },
  { label: "WALLET ADDRESS" },
  { label: "ACTION" },
];

const Page = () => {
  const { data: phaseData, refetch: refetchPhase } = usePhaseDetailsQuery("");
  const [phaseDetails, setPhaseDetails] = useState<phaseDetailsType>();
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<any>();
  const [setCopied] = useCopyClipboard();
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const userKycStatus = useSelector<any>(
    (state) => state?.reducers?.userDetails?.userDetail?.kycStatus
  );
  const [allCoinBalance, setAllCoinBalance] = useState<
    Record<string, string>[]
  >([]);
  const [selectedCoin, setSelectedCoin] = useState<any>({
    coin: "",
  });
  const [mergedCoinData, setMergedCoinData] = useState<Record<string, any>[]>(
    []
  );

  const ozolioBalance: any = allCoinBalance.find(
    (wallet) => wallet.coin === "token"
  );

  useEffect(() => {
    if (phaseData?.status === RESPONSES.SUCCESS) {
      setPhaseDetails(phaseData.data);
    }
  }, [phaseData]);

  const [showDeposit, setShowDeposit] = useState(false);
  const handleCloseDeposit = () => setShowDeposit(false);
  const handleShowDeposit = (userWallet: string) => {
    setSelectedWallet(userWallet);
    setShowDeposit(true);
  };

  //handle withdraw modal
  const [showWithdraw, setShowWithdraw] = useState(false);
  const handleCloseWithdraw = () => setShowWithdraw(false);
  const handleShowWithdraw = (userWallet: any) => {
    if (userKycStatus == KYC_STATUS?.APPROVED && ozolioBalance?.balance > 0) {
      setSelectedCoin(userWallet);
      setShowWithdraw(true);
    } else if (selectedCoin && selectedCoin?.is_withdraw_disabled) {
      toaster.error("Admin has disabled withdrawal");
    } else if (ozolioBalance?.balance <= 0) {
      toaster.error("You don't have any claimable balance");
    } else {
      toaster.error("Your KYC is not completed");
    }
  };

  // Handle Buy Modal
  const [showBuy, setShowBuy] = useState(false);
  const handleCloseBuy = () => setShowBuy(false);
  const handleShowBuyModal = (item: any) => {
    setSelectedWallet(item);
    setShowBuy(true);
  };
  // Fetch wallet balance
  const { data: walletBalanceData, refetch: refetchWalletBalance } =
    useUserWalletbalanceQuery("");
  useEffect(() => {
    if (walletBalanceData?.status === RESPONSES.SUCCESS) {
      setAllCoinBalance(walletBalanceData?.data || []);
    }
  }, [walletBalanceData]);

  useEffect(() => {
    refetchWalletBalance();
    refetchPhase();
  }, []);

  //merge coins from backend and fiat currency arrays
  useEffect(() => {
    setSkeletonLoader(true);
    const mergedData = [...allCoinBalance, ...fiatCoin].sort((a, b) => {
      // Sort alphabetically by coin name
      if (a.coin < b.coin) return -1;
      if (a.coin > b.coin) return 1;
      return 0;
    });
    setMergedCoinData(mergedData);
    setSkeletonLoader(false);
  }, [allCoinBalance, fiatCoin]);

  const handleCopy = (data: string) => {
    if (data?.length) {
      setCopied(data);
      toaster.success("Address copied");
    }
  };

  useEffect(() => {
    const selectedToken: any = allCoinBalance?.find(
      (wallet) => wallet?.coin === "token"
    );
    setSelectedToken(selectedToken);
  }, [showWithdraw, allCoinBalance]);

  useEffect(() => {
    if (socket) {
      socket.on("deposit", (data: any) => {
        refetchWalletBalance();
      });
      return () => {
        socket.off("deposit");
      };
    }
  }, [socket]);

  return (
    <div className="wallet_page py-5 py-2">
      <Container>
        <div className="common-page">
          <h3 className="mb-5">User Wallets</h3>
          {phaseDetails?.upcomingPhase && !phaseDetails?.phaseDetails ? (
            <div className="next-phase common-bg">
              <h3>Currently, no phase is active</h3>
            </div>
          ) : null}
          <CustomTable fields={fields} skeletonLoader={skeletonLoader}>
            {mergedCoinData?.length > 0 &&
              mergedCoinData?.map((item: any, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {item?.coin === "token"
                      ? TOKEN_SYMBOL
                      : item?.coin?.toUpperCase()}
                  </td>

                  {item && item?.total_balance > 0 ? (
                    <td>{transformNumber(item?.total_balance / DECIMAL)}</td>
                  ) : item && !item?.is_crypto ? (
                    <td>N/A</td>
                  ) : (
                    <td>{transformNumber(item?.balance / DECIMAL)}</td>
                  )}

                  <td
                    onClick={() => handleCopy(item?.address)}
                    style={{ cursor: "pointer" }}
                    className="align-items-center justify-content-between"
                  >
                    <span className="copy-btn">
                      {item?.address?.length === 0
                        ? "N/A"
                        : `${item?.address.slice(0, 6)}...${item?.address.slice(-5)} `}{" "}
                      {item?.address?.length === 0 ? null : <CopyIcon />}
                    </span>
                  </td>
                  <td>
                    {item?.coin === "token" ? (
                      <>
                        <Button
                          text="Buy OZOT"
                          className="sm-btn me-4 me-md-5"
                          onClick={() => handleShowBuyModal(item)}
                          disabled={
                            (!phaseDetails?.phaseDetails &&
                              phaseDetails?.upcomingPhase) ||
                            item?.balance === 0
                              ? true
                              : false
                          }
                        />
                        <Button
                          className="sm-btn "
                          text="Withdraw OZOT"
                          onClick={() => handleShowWithdraw(item)}
                          disabled={
                            item?.total_balance <= 0 ||
                            (selectedToken &&
                              selectedToken?.is_withdraw_disabled)
                          }
                        />
                      </>
                    ) : (
                      <>
                        {item.is_crypto === 0 ? (
                          <>
                            <Button
                              text="Buy OZOT"
                              className="sm-btn"
                              onClick={() => handleShowBuyModal(item)}
                              disabled={
                                !phaseDetails?.phaseDetails &&
                                phaseDetails?.upcomingPhase
                                  ? true
                                  : false
                              }
                            />
                          </>
                        ) : (
                          <>
                            <Button
                              text="Buy OZOT"
                              className="sm-btn  me-4 me-md-5"
                              onClick={() => handleShowBuyModal(item)}
                              disabled={
                                (!phaseDetails?.phaseDetails &&
                                  phaseDetails?.upcomingPhase) ||
                                item?.balance === 0
                                  ? true
                                  : false
                              }
                            />
                            <Button
                              className="sm-btn "
                              text="Deposit"
                              onClick={() => handleShowDeposit(item)}
                            />
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </CustomTable>
          <Deposit
            show={showDeposit}
            handleClose={handleCloseDeposit}
            selectedWallet={selectedWallet}
          />
          <BuyModal
            showBuy={showBuy}
            handleCloseBuy={handleCloseBuy}
            userWallets={allCoinBalance}
            refetchWalletBalance={refetchWalletBalance}
            mergedCoinData={mergedCoinData}
            phaseDetails={phaseDetails?.phaseDetails}
            selectedWallet={selectedWallet}
          />
          <WithddrawModal
            showWithdraw={showWithdraw}
            handleCloseWithdraw={handleCloseWithdraw}
            allCoinBalance={allCoinBalance}
            selectedCoin={selectedCoin}
            refetchWalletBalance={refetchWalletBalance}
          />
        </div>
      </Container>
    </div>
  );
};

export default React.memo(Page);
