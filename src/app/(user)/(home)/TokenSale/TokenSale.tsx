import { Container } from "react-bootstrap";
import "./TokenSale.scss";
import { useState } from "react";
// import { usePhaseDetailsQuery } from "@/services/rtk.api.service";
// import { RESPONSES } from "@/constants";
// import LandingPageTimer from "../Landingpageendtimer";
// import PhaseDetailModal from "./PhaseDetailModal/PhaseDetailModal";
// import { InfoIcon } from "@/app/_ui/svg/_svg";

const TokenSale = () => {
  // const [timerValue, setTimerValue] = useState<Date | null>(null);
  // const [show, setShow] = useState(false);
  // const [timerMessage, setTimerMessage] = useState<string>("Token Sale!");
  const [icoEnded, _setIcoEnded] = useState<Boolean>(false);
  // const { data: phaseData } = usePhaseDetailsQuery(
  //   { count: 5 },
  //   { refetchOnMountOrArgChange: true }
  // );

  // open this comment for get data from API dynamic start date and end date,   required
  // const getPhaseTimer = () => {
  //   if (phaseData?.status === RESPONSES.SUCCESS) {
  //     let startDate: any;
  //     let endDate: any;
  //     const currentTime = new Date();
  //     if (phaseData?.data?.phaseDetails) {
  //       startDate = new Date(phaseData?.data?.phaseDetails?.phaseStartDate);
  //       endDate = new Date(phaseData?.data?.phaseDetails?.phaseEndDate);
  //       setIcoEnded(
  //         phaseData?.data?.phaseDetails?.phaseNumber === 4 ? true : false
  //       );
  //     } else if (phaseData?.data?.upcomingPhase) {
  //       startDate = new Date(phaseData?.data?.upcomingPhase?.phaseStartDate);
  //       endDate = new Date(phaseData?.data?.upcomingPhase?.phaseEndDate);
  //     }
  //     if (currentTime < startDate) {
  //       setTimerValue(startDate);
  //       setTimerMessage("Phase starts in");
  //     } else if (currentTime >= startDate && currentTime <= endDate) {
  //       setTimerValue(endDate);
  //       setTimerMessage("Phase ends in");
  //     }
  //   }
  // };

  // static data only, not required
  // const phaseData = {
  //   status: 200,
  //   data: {
  //     phaseDetails: {
  //       contractAddress: "0x3e41Fe05a8E483cA2A999B9294f41D12a9aE2b22",
  //       icoPhaseName: "Phase 1",
  //       id: "3ca73c35-6b7f-11ef-8ac2-0242ac180004",
  //       isDeleted: "0",
  //       isPhaseActive: "1",
  //       limit: 69000,
  //       lockingPeriod: 360,
  //       maxBuy: 1000000,
  //       minBuy: 1,
  //       phaseEndDate: "2025-04-13T11:59:59.000Z",
  //       phaseNumber: 1,
  //       phaseStartDate: "2025-03-17T10:30:00.000Z",
  //       price: 0.2,
  //       reason: "",
  //       sold: 1800,
  //       vestingPeriod: 180,
  //     },
  //     upcomingPhase: {
  //       contractAddress: "0x3e41Fe05a8E483cA2A999B9294f41D12a9aE2b22",
  //       icoPhaseName: "Phase 1",
  //       id: "3ca73c35-6b7f-11ef-8ac2-0242ac180004",
  //       isDeleted: "0",
  //       isPhaseActive: "1",
  //       limit: 69000,
  //       lockingPeriod: 360,
  //       maxBuy: 1000000,
  //       minBuy: 1,
  //       phaseEndDate: "2025-04-13T11:59:59.000Z",
  //       phaseNumber: 1,
  //       phaseStartDate: "2025-03-17T10:30:00.000Z",
  //       price: 0.2,
  //       reason: "",
  //       sold: 1800,
  //       vestingPeriod: 180,
  //     },
  //   },
  // };

  // const getPhaseTimer = () => {
  //   if (phaseData?.status === 200) {
  //     let startDate: any;
  //     let endDate: any;
  //     const currentTime = new Date();

  //     if (phaseData?.data?.phaseDetails) {
  //       startDate = new Date(phaseData.data.phaseDetails.phaseStartDate);
  //       endDate = new Date(phaseData.data.phaseDetails.phaseEndDate);
  //       setIcoEnded(phaseData.data.phaseDetails.phaseNumber === 4);
  //     } else if (phaseData?.data?.upcomingPhase) {
  //       startDate = new Date(phaseData.data.upcomingPhase.phaseStartDate);
  //       endDate = new Date(phaseData.data.upcomingPhase.phaseEndDate);
  //     }
  //     if (currentTime < startDate) {
  //       setTimerValue(startDate);
  //       setTimerMessage("Phase starts in");
  //     } else if (currentTime >= startDate && currentTime <= endDate) {
  //       setTimerValue(endDate);
  //       setTimerMessage("Phase ends in");
  //     }
  //   }
  // };

  // code comment to show modal of phase details, required
  // const handlePhaseModalShow = () => {
  //   setShow(!show);
  // };

  // code comment to call api to get data of phase,  required
  // useEffect(() => {
  //   getPhaseTimer();
  //   // eslint-disable-next-line
  // }, [phaseData?.data]);

  return (
    <>
      {!icoEnded ?
        <div className="token_sale">
          <Container>
            <div className="token_sale_content d-lg-flex align-items-center  flex-column justify-content-center">
              {/* Timer comment */}
              {/* <div className="d-lg-flex align-items-center justify-content-center">
                <h2>{timerMessage}</h2>
                {timerValue && (
                  <div className="token_sale_timer">
                    <LandingPageTimer expiryTimestamp={timerValue} />
                  </div>
                )}
              </div> */}
              {/* {timerValue &&
                phaseData?.data?.upcomingPhase?.phaseNumber === 1 && (
                  <div className="info_text">
                    Due to unforeseen circumstances, the first phase has been
                    shifted to June 4th. We are sorry for any inconvenience.
                  </div>
                )} */}
              <div className="info_text">
                Due to unforeseen circumstances, our ICO has been temporarily put on hold until further notice. Please rest assured that we are diligently addressing the challenges at hand, and once they are fully resolved, we will promptly resume the countdown to our first pre-sale. We sincerely apologize for any inconvenience this may cause and greatly appreciate your patience and understanding during this time. Thank you very much for your continued support.
              </div>
            </div>
            {/* <span onClick={handlePhaseModalShow} className="phase_info_icon">
              <InfoIcon fill="#fff" />
            </span> */}
          </Container>
        </div>
        : null}

      {/* <PhaseDetailModal
        show={show}
        handlePhaseModalShow={handlePhaseModalShow}
        phaseData={
          phaseData?.data?.phaseDetails ?
            phaseData?.data?.phaseDetails
            : phaseData?.data?.upcomingPhase
        }
      /> */}
    </>
  );
};

export default TokenSale;
