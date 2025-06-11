/** @format */
"use client";
import React, { useEffect, useState } from "react";
import {
  useGetUserProfileQuery,
  usePhaseDetailsQuery,
  useUserLogoutMutation,
  useUserWalletbalanceQuery,
} from "@/services/rtk.api.service";
import { useDispatch } from "react-redux";
import TxnHistory from "../_Components/TransactionHistory/TransactionHistory";
import dynamic from "next/dynamic";
import { setUserDetail } from "@/lib/redux/slices/userDetailSlice";
import { Action, Dispatch } from "redux";
import { DECIMAL, RESPONSES, TOKEN_NAME, TOKEN_SYMBOL } from "@/constants";
import { Button } from "@/common";
import { UserData, phaseDetailsType } from "@/interfaces/user";
import { Col, Container, Row } from "react-bootstrap";
import InfoCard from "./InfoCard/InfoCard";
import { CopyIcon, DashboardInfoIcon, InfoIcon } from "@/app/_ui/svg/_svg";
import "./style.scss";
import useCopyClipboard from "@/app/hooks/useCopyToClipboard";
import toaster from "@/common/Toast";
import { capitalizeFirstWord, transformNumber } from "@/constants/utils";
import fiatCoin from "../../../json/fiat-coin.json";
import { useRouter } from "next/navigation";
import ConnectWallet from "@/common/Metamask/importToken";
import { KYC_STATUS } from "@/constants";
import { socket } from "@/socket";
import { useSelector } from "react-redux";

const BuyModal = dynamic(
  () => import("../wallets/(crypto)/components/BuyModal"),
  { ssr: false }
);

const WithddrawModal = dynamic(
  () => import("../wallets/(crypto)/components/Withdraw"),
  {
    ssr: false,
  }
);

function Page() {
  const [userLogout] = useUserLogoutMutation();
  const { data: phaseData, refetch: refetchPhase } = usePhaseDetailsQuery("");
  const { data: userProfile, refetch } = useGetUserProfileQuery("");
  const [allCoinBalance, setAllCoinBalance] = useState<any[]>([]);
  const dispatch: Dispatch<Action<string>> = useDispatch();
  const [profileData, setProfileData] = useState<UserData>();
  const [phaseDetails, setPhaseDetails] = useState<phaseDetailsType>();
  const [contractAddress, setContractAddress] = useState<string | undefined>(
    ""
  );

  const [setCopied] = useCopyClipboard();
  const [selectedCoin, setSelectCoin] = useState<any>();
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const router: any = useRouter();
  const [mergedCoinData, setMergedCoinData] = useState<Record<string, any>[]>(
    []
  );
  const userKycStatus = useSelector<any>(
    (state) => state?.reducers?.userDetails?.userDetail?.kycStatus
  );
  const biocharBalance = allCoinBalance.find(
    (wallet) => wallet.coin === "token"
  );

  //handle withdraw modal
  const [showWithdraw, setShowWithdraw] = useState(false);
  const handleCloseWithdraw = () => setShowWithdraw(false);
  const handleShowWithdraw = () => {
    const withdrawDisabled = allCoinBalance.find(
      (wallet) => wallet?.coin === "token"
    );
    if (userKycStatus == KYC_STATUS?.APPROVED && biocharBalance?.balance > 0) {
      setShowWithdraw(true);
    } else if (
      withdrawDisabled &&
      withdrawDisabled?.is_withdraw_disabled === 1
    ) {
      toaster.error("Admin has disabled withdrawal");
    } else if (biocharBalance?.balance <= 0) {
      toaster.error("You don't have any claimable balance");
    } else {
      toaster.error("Your KYC is not completed");
    }
  };

  const copy = (data: any, message?: string) => {
    setCopied(data);
    if (message) toaster.success(message);
  };

  const [showBuy, setShowBuy] = useState(false);
  const handleCloseBuy = () => setShowBuy(false);
  const handleShowBuyModal = () => {
    setShowBuy(true);
  };

  const { data: walletBalanceData, refetch: refetchWalletBalance } =
    useUserWalletbalanceQuery("");

  useEffect(() => {
    refetch();
    refetchPhase();
    refetchWalletBalance();
  }, [refetch, refetchPhase, refetchWalletBalance]);

  useEffect(() => {
    if (walletBalanceData?.status === RESPONSES.SUCCESS) {
      setAllCoinBalance(walletBalanceData?.data || []);
    }
    if (userProfile?.status === RESPONSES.SUCCESS) {
      setProfileData(userProfile?.data);
      dispatch(setUserDetail(userProfile?.data));
    }
    if (phaseData?.status === RESPONSES.SUCCESS) {
      setContractAddress(
        phaseData?.data?.phaseDetails
          ? phaseData?.data?.phaseDetails?.contractAddress
          : phaseData?.data?.upcomingPhase?.contractAddress
      );
      setPhaseDetails(phaseData.data);
    }
  }, [walletBalanceData, userProfile, phaseData, dispatch]);

  useEffect(() => {
    const selectedToken = allCoinBalance.find(
      (wallet) => wallet?.coin === "token"
    );
    setSelectCoin(selectedToken);
  }, [showWithdraw]);
  //merge coins from backend and fiat currency arrays
  useEffect(() => {
    const mergedData = [...allCoinBalance, ...fiatCoin];
    setMergedCoinData(mergedData);
  }, [allCoinBalance]);

  //merge coins from backend and fiat currency arrays
  useEffect(() => {
    const mergedData = [...allCoinBalance, ...fiatCoin];
    setMergedCoinData(mergedData);
  }, [allCoinBalance]);

  useEffect(() => {
    const maticWallet: any = mergedCoinData?.find(
      (wallet) => wallet.coin === "eth"
    );
    setSelectedWallet(maticWallet);
  }, [showBuy, mergedCoinData]);

  const navigateToPage = (type: string) => {
    if (type === "kyc") {
      router.push(`kyc-details`);
    } else {
      router.push(`/settings?tab=2fa`);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("block_status", (data: any) => {
        if (data?.status === "BLOCKED") {
          userLogout("");
        }
      });
      socket.on("kyc_status", (data: any) => {
        console.log("data", data);
        refetch();
      });
      return () => {
        socket.off("block_status");
        socket.off("kyc_status");
      };
    }
  }, [socket]);

  return (
    <div className="dashboard py-60 pb-100">
      <Container>
        <div className="dashboard__investment">
          <Row className="m-0">
            <Col md={6} className="p-0">
              <div className="dashboard__investment__left">
                <h3 className="mb-5">Investor Dashboard</h3>

                <div className="info-wrap">
                  <div className="" onClick={() => navigateToPage("2fa")}>
                    <InfoCard
                      title="2FA"
                      status={profileData?.is2Fa ? "Enabled" : "Disabled"}
                      showImg={true}
                      statusClass={profileData?.is2Fa ? "" : "reject"}
                    />
                  </div>
                  <div
                    className="navigateToPage"
                    onClick={() => navigateToPage("kyc")}
                  >
                    <InfoCard
                      title="KYC"
                      status={
                        profileData?.kycStatus === "NOT_INITIATED"
                          ? "Not Initiated"
                          : capitalizeFirstWord(
                            profileData?.kycStatus
                              ? profileData?.kycStatus
                              : ""
                          )
                      }
                      showImg={false}
                      statusClass={
                        profileData?.kycStatus === KYC_STATUS.APPROVED
                          ? ""
                          : "reject"
                      }
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="p-0">
              <div className="dashboard__investment__right">
                <h3 className="bal-title">
                  {TOKEN_NAME} Claimable Balance
                  <span>
                    {biocharBalance && biocharBalance?.balance > 0
                      ? transformNumber(biocharBalance?.balance / DECIMAL)
                      : "0.00"}
                    {` ${TOKEN_SYMBOL}`}
                  </span>
                </h3>
                <h3 className="bal-title">
                  {TOKEN_NAME} Total Balance
                  <span>
                    {biocharBalance && biocharBalance?.total_balance > 0
                      ? transformNumber(biocharBalance?.total_balance / DECIMAL)
                      : "0.00"}
                    {` ${TOKEN_SYMBOL}`}
                  </span>
                </h3>

                <div className="contract-wrap">
                  <h3>Contract Address
                    <span className="contract_info_icon">
                      <DashboardInfoIcon fill={'#000'} tooltipText={'Ethereum Sepolia Chain compatible wallet address that you will use to send and receive Coin'} />
                    </span>
                  </h3>
                  <div className="input-wrap copy_address_input">
                    <input value={contractAddress} readOnly />
                    <button
                      type="button"
                      onClick={() => copy(contractAddress, "Address copied")}
                    >
                      <CopyIcon />
                    </button>
                  </div>
                  <Button
                    disabled={
                      !phaseDetails?.phaseDetails && phaseDetails?.upcomingPhase
                        ? true
                        : false
                    }
                    text="Buy OZOT"
                    onClick={handleShowBuyModal}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="withdraw-sec common-bg"
        // style={{
        //   filter:
        //     selectedCoin && selectedCoin?.is_withdraw_disabled
        //       ? "blur(4px)"
        //       : "none",
        // }}
        >
          <div className="withdraw-sec">
            <h3>Withdraw your {TOKEN_SYMBOL}</h3>
            <h5>Follow these Instructions</h5>
            <p>
              Enter the Ethereum Sepolia Chain compatible wallet address that
              you will use to send and receive Coin
            </p>
            <Row>
              <Col md={6}>
                <div className="withdraw-card">
                  <h3>
                    1. Add the {TOKEN_NAME} Token contract to your wallet under
                    “Import Tokens”.
                  </h3>

                  <div className="input-wrap copy_address_input">
                    <input
                      value={
                        contractAddress &&
                        `${contractAddress.slice(0, 10)}.....${contractAddress.slice(-10)}`
                      }
                      readOnly
                    />
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        type="button"
                        onClick={() => copy(contractAddress, "Address copied")}
                      >
                        <CopyIcon />
                      </button>

                      {selectedCoin &&
                        selectedCoin?.is_withdraw_disabled ? null : (
                        <ConnectWallet smartAddress={contractAddress} />
                      )}
                    </div>
                  </div>
                  {/* <Button text='Click here to Import token' /> */}
                </div>
              </Col>
              <Col md={6}>
                <div className="withdraw-card">
                  <h3>
                    2. Add your wallet address where you want your{" "}
                    {TOKEN_SYMBOL} token deposited.
                  </h3>
                  <Button
                    className="mt-0 withdraw_btn"
                    text={`Withdraw ${TOKEN_SYMBOL}`}
                    onClick={() => handleShowWithdraw()}
                  />
                  {/* <div className='input-wrap'>
                  <input placeholder='Address' type='text' />
                </div> */}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {phaseDetails?.upcomingPhase && !phaseDetails?.phaseDetails ? (
          <div className="next-phase common-bg">
            <h3>Currently, no phase is active</h3>
          </div>
        ) : null}
        <TxnHistory />
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
      </Container>
    </div>
  );
}

export default Page;
