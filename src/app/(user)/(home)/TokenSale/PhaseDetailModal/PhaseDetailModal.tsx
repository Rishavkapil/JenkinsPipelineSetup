import { LockIcon } from "@/app/_ui/svg/_svg";
import { CommonModal, CustomTable } from "@/common";
import { DECIMAL } from "@/constants";
import { usePhaseDetailsQuery } from "@/services/rtk.api.service";
import moment from "moment";
import React, { useState } from "react";

function PhaseDetailModal({ show, phaseData, handlePhaseModalShow }: any) {
  const [skeletonLoader, setSkeletonLoader] = useState(false);

  const vestingHeader = [
    { label: "SR.NO" },
    { label: "PHASE NAME" },
    { label: "START DATE" },
    { label: "END DATE" },
    { label: "TOKEN PRICE" },
    { label: "BUY (min / max)" },
    { label: "LOCKING PERIOD" },
    { label: "VESTING PERIOD" },
  ];

  return (
    <div>
      <CommonModal
        show={show}
        backdrop="static"
        onHide={handlePhaseModalShow}
        title={
          phaseData?.isPhaseActive ?
            "Active phase details"
          : "Upcoming phase details"
        }
        className="phase_detail_modal">
        <CustomTable fields={vestingHeader} skeletonLoader={skeletonLoader}>
          {phaseData && [phaseData]?.length > 0 ?
            [phaseData]?.map((item: any, index: any) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.icoPhaseName}</td>
                {/* <td>
                  {moment(item?.phaseStartDate).format("D-MMM-YYYY HH:mm")}
                </td> */}
                <td>
                  {moment.utc(item?.phaseStartDate).format("D-MMM-YYYY HH:mm")}
                </td>
                <td>
                  {moment.utc(item?.phaseEndDate).format("D-MMM-YYYY HH:mm")}
                </td>
                {/* <td>{moment(item?.phaseEndDate).format("D-MMM-YYYY HH:mm")}</td> */}
                <td>$ {item?.price}</td>
                <td>{`${item?.minBuy} - ${item?.maxBuy}`}</td>
                <td>{item?.lockingPeriod / 30} Months</td>
                <td>{item?.vestingPeriod / 30} Months</td>
              </tr>
            ))
          : <div className="no_record_box text-center">
              <p>No Record Found</p>
            </div>
          }
        </CustomTable>
      </CommonModal>
    </div>
  );
}

export default PhaseDetailModal;
