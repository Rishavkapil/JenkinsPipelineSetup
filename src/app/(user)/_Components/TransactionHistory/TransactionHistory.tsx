/** @format */

"use client";

import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTxnHistoryMutation } from "@/services/rtk.api.service";
import { DECIMAL, SEPOLIA_URL_TX, SEPOLIA_TO_URL, LIMIT } from "@/constants";
import moment from "moment";
import Link from "next/link";
import { HistoryItem } from "@/interfaces/user";
import { CustomTable } from "@/common";
import Paginations from "@/common/Pagination";
import "./style.scss";
import { getWithrawStatusText, transformNumber } from "@/constants/utils";
import { socket } from "@/socket";

const fields = [
  { label: "SR.NO" },
  { label: "CURRENCY" },
  { label: "TOKEN BALANCE" },
  { label: "TRANSACTION HASH" },
  { label: "ADDRESS FROM" },
  { label: "ADDRESS TO" },
  { label: "DATE" },
  { label: "STATUS" },
];

function TxnHistory() {
  const [key, setKey] = useState<string>("receive");
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [txnHistory] = useTxnHistoryMutation();
  const [pages, setPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [skeletonLoader, setSkeletonLoader] = useState(false);

  const fetchData = async (type: string) => {
    setSkeletonLoader(true);
    const dataBody = {
      type,
      page: pages,
      size: LIMIT,
    };
    try {
      const response = await txnHistory(dataBody);
      setSkeletonLoader(false);
      setHistoryData(response?.data?.data);
      setTotalRecords(response?.data?.data[0]?.totalRecords);
    } catch (error) {
      console.error("Failed to fetch transaction history:", error);
      setHistoryData([]);
      setSkeletonLoader(false);
    }
  };

  const handleKey = (type: string) => {
    if (type !== key) {
      setHistoryData([]);
      setPages(1);
      setKey(type);
      fetchData(type);
    }
  };

  useEffect(() => {
    fetchData(key);
  }, [pages, key]);

  const pageChanges = (pages: number) => {
    setPages(pages);
  };
  //Socket event handling
  useEffect(() => {
    if (socket) {
      socket.on("deposit", (data: any) => {
        fetchData("receive");
      });
      socket.on("withdraw", (data: any) => {
        fetchData("send");
      });
      return () => {
        socket.off("deposit");
        socket.off("withdraw");
      };
    }
  }, [socket]);

  return (
    <div className="tranx-sec" id="page-top">
      <h3>Transaction History</h3>
      <Tabs
        activeKey={key}
        defaultActiveKey="receive"
        transition={false}
        onSelect={(k) => handleKey(k as string)}
        className="common-tabs"
      >
        <Tab eventKey="receive" title="Deposit History" >
          <CustomTable fields={fields} skeletonLoader={skeletonLoader}>
            {historyData?.length > 0 &&
              historyData?.map((item: any, index: number) => (
                <tr key={item?.id}>
                  <td>{LIMIT * (pages - 1) + index + 1}</td>
                  <td>{item?.coin}</td>
                  <td>{transformNumber(item?.amount / DECIMAL)}</td>
                  {item?.tx_id != null ? (
                    <td title={item?.tx_id}>
                      <Link
                        href={`${SEPOLIA_URL_TX}${item?.tx_id}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item?.tx_id.slice(0, 7)}...
                        {item?.tx_id.slice(-7)}
                      </Link>
                    </td>
                  ) : null}
                  <td>
                    {item?.address_from?.length < 0 ? (
                      "N/A"
                    ) : item?.address_from != null ? (
                      <Link
                        href={`${SEPOLIA_TO_URL}${item?.address_from}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item?.address_from.slice(0, 7)}...
                        {item?.address_from.slice(-7)}
                      </Link>
                    ) : null}
                  </td>
                  <td>
                    {item?.address_to?.length < 0 ? (
                      "N/A"
                    ) : item?.address_to != null ? (
                      <Link
                        href={`${SEPOLIA_TO_URL}${item?.address_to}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item?.address_to.slice(0, 7)}...
                        {item?.address_to.slice(-7)}
                      </Link>
                    ) : null}
                  </td>
                  <td>{moment(item?.created_at).format("D-MMM-YYYY HH:mm")}</td>
                  <td>{item?.status === 2 ? "Completed" : "Pending"}</td>
                </tr>
              ))}
          </CustomTable>
          {historyData &&
          historyData.length &&
          totalRecords >= LIMIT &&
          !skeletonLoader ? (
            <div className="field d-flex align-items-center justify-content-center mt-4">
              <Paginations
                countData={totalRecords}
                pageChanges={pageChanges}
                limit={LIMIT}
                activePage={pages}
              />
            </div>
          ) : null}
        </Tab>
        <Tab eventKey="send" title="Withdraw History" >
          <CustomTable fields={fields} skeletonLoader={skeletonLoader}>
            {historyData?.length > 0 &&
              historyData?.map((item: any, index: number) => (
                <tr key={item?.id}>
                  <td>{LIMIT * (pages - 1) + index + 1}</td>
                  <td>OZOT</td>
                  <td>{transformNumber(item?.amount / DECIMAL)}</td>
                  <td>
                    {item?.tx_id === "" ? (
                      "N/A"
                    ) : item?.tx_id != null ? (
                      <Link
                        href={`${SEPOLIA_URL_TX}${item?.tx_id}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item?.tx_id.slice(0, 7)}...
                        {item?.tx_id.slice(-7)}
                      </Link>
                    ) : null}
                  </td>
                  <td>
                    {item?.address_from === "" ||
                    item?.address_from === "undefined" ||
                    item?.address_from === "null" ? (
                      "N/A"
                    ) : item?.address_from != null ? (
                      <Link
                        href={`${SEPOLIA_TO_URL}${item?.address_from}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item?.address_from.slice(0, 7)}...
                        {item?.address_from.slice(-7)}
                      </Link>
                    ) : null}
                  </td>
                  <td>
                    {item?.address_to === "" ? (
                      "N/A"
                    ) : item?.address_to != null ? (
                      <Link
                        href={`${SEPOLIA_TO_URL}${item?.address_to}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item?.address_to.slice(0, 7)}...
                        {item?.address_to.slice(-7)}
                      </Link>
                    ) : null}
                  </td>
                  <td>{moment(item?.created_at).format("D-MMM-YYYY HH:mm")}</td>
                  {item?.status === 3 ? (
                    <td title={`Reason : ${item?.reason}`}>
                      {getWithrawStatusText(item?.status)}
                    </td>
                  ) : (
                    <td>{getWithrawStatusText(item?.status)}</td>
                  )}
                </tr>
              ))}
          </CustomTable>
          {historyData &&
          historyData.length &&
          totalRecords >= LIMIT &&
          !skeletonLoader ? (
            <div className="field d-flex align-items-center justify-content-center mt-4">
              <Paginations
                countData={totalRecords}
                pageChanges={pageChanges}
                limit={LIMIT}
                activePage={pages}
              />
            </div>
          ) : null}
        </Tab>
      </Tabs>
    </div>
  );
}

export default TxnHistory;
