"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Collapse,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  useOrderHistoryMutation,
  useTxnHistoryMutation,
  useVestingOrderMutation,
} from "@/services/rtk.api.service";
import { DECIMAL, LIMIT, RESPONSES } from "@/constants";
import { CustomTable } from "@/common";
import moment from "moment";
import { transformNumber } from "@/constants/utils";
import "./order.scss";
import Paginations from "@/common/Pagination";
import { DownArroWSvg, LockIcon } from "@/app/_ui/svg/_svg";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const headers = [
  { field: "sn", headerName: "SR.NO" },
  { field: "from_coin", headerName: "CURRENCY" },
  { field: "coin_amount", headerName: "AMOUNT" },
  { field: "token_amount", headerName: "TOKEN AMOUNT" },
  { field: "created_at", headerName: "ORDER DATE" },
  { field: "status", headerName: "STATUS" },
  { field: "expandable", headerName: "" },
];

const vestingHeader = [
  { label: "SR.NO" },
  { label: "TOKEN RELEASE" },
  { label: `UNLOCKED AT` },
  { label: "MATURED AT" },
  { label: "STATUS" },
];
const fields = [
  { label: "SR.NO" },
  { label: "CURRENCY" },
  { label: "AMOUNT" },
  { label: "ORDER DATE" },
  { label: "STATUS" },
];

const ExpandableTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const FiatPaymentStatus = searchParams.get("payment");
  const FiatPaymentMessage = searchParams.get("message");

  const [expandedRow, setExpandedRow] = useState(null);
  const [vestingData, setVestingData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [pages, setPages] = useState(1);
  const [page2, setPage2] = useState(1);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [failedListCount, setFailedListCount] = useState(0);
  const [key, setKey] = useState(
    FiatPaymentStatus === "failed" ? "failed" : "completed"
  );

  const [txnHistory] = useTxnHistoryMutation();
  const [orderHistory] = useOrderHistoryMutation();
  const [vestingOrder] = useVestingOrderMutation();

  useEffect(() => {
    fetchOrderList(key);
  }, [key, pages, page2]);

  const fetchOrderList = async (type: string) => {
    setSkeletonLoader(true);
    const data = { type: "buy", page: pages, size: LIMIT };
    if (type === "failed") {
      setHistoryData([]);
      const response = await orderHistory({ page: page2, size: LIMIT });
      if (response?.data?.status === RESPONSES.SUCCESS) {
        setHistoryData(response?.data?.data?.rows);
        setTotalRecords(response?.data?.data?.count);
        setFailedListCount(response?.data?.data?.count);
        setSkeletonLoader(false);
      }
    } else {
      setHistoryData([]);
      const response = await txnHistory(data);
      if (response?.data?.status === RESPONSES.SUCCESS) {
        setHistoryData(response?.data?.data);
        setTotalRecords(
          response?.data && response?.data?.data[0]?.totalRecords
        );
        setSkeletonLoader(false);
      }
    }
  };

  const fetchVestingDetails = async (orderId: any) => {
    const response = await vestingOrder({ orderId, page: 1, size: LIMIT });
    if (response?.data?.status === RESPONSES.SUCCESS) {
      setVestingData(response?.data.data);
    }
  };

  const handleRowClick = (rowId: any) => {
    const isRowExpanded = expandedRow === rowId;
    if (!isRowExpanded) {
      fetchVestingDetails(rowId);
    }
    setExpandedRow(isRowExpanded ? null : rowId);
  };

  const handleTabSelect = (key: string) => {
    setHistoryData([]);
    setKey(key);
    setPages(1); // Reset to the first page when the tab changes
    setPage2(1);
    fetchOrderList(key);
  };

  const pageChanges = (pages: number) => {
    setPages(pages);
  };

  const pageChangesFailed = (PageChange: number) => {
    setPage2(PageChange);
  };

  useEffect(() => {
    if (FiatPaymentStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your payment is successfully processed.",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).finally(() => {
        const path = window.location.pathname;
        router.replace(path);
      }
      );
    } else if (FiatPaymentStatus === "failed") {
      setKey("failed");
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: `${FiatPaymentMessage}`,
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).finally(() => {
        const path = window.location.pathname;
        router.replace(path);
      });
    }
  }, [FiatPaymentStatus]);

  return (
    <Container>
      <div className="tranx-sec pt-5" id="page-top">
        <Row className="">
          <Col>
            <h3>Order details</h3>
          </Col>
        </Row>
        <Tabs
          activeKey={key}
          onSelect={(key) => handleTabSelect(key as string)}
          className="common-tabs"
        >
          <Tab eventKey="completed" title="Completed Orders">
            <Table responsive className="Order_table" hover>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header.field}>{header.headerName}</th>
                  ))}
                </tr>
              </thead>
              {historyData?.length > 0 ? (
                <tbody>
                  {historyData?.map((item: any, index: any) => (
                    <React.Fragment key={item?.id}>
                      <tr>
                        <td>{LIMIT * (pages - 1) + index + 1}</td>
                        <td>{item?.from_coin}</td>
                        <td>{transformNumber(item?.coin_amount / DECIMAL)}</td>
                        <td>{transformNumber(item?.token_amount / DECIMAL)}</td>
                        <td>
                          {moment(item?.created_at).format("D-MMM-YYYY HH:mm")}
                        </td>
                        <td>{item?.status === 1 ? "Completed" : "Pending"}</td>
                        {/* <td>{new Date(item.created_at).toLocaleDateString()}</td> */}
                        <td className="down-arrow">
                          <DownArroWSvg
                            onClick={() => handleRowClick(item?.id)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={headers.length} className="p-0">
                          <Collapse in={expandedRow === item.id}>
                            <div className="p-3">
                              <CustomTable
                                fields={vestingHeader}
                                skeletonLoader={skeletonLoader}
                              >
                                {vestingData && vestingData?.length > 0 ? (
                                  vestingData?.map((item: any, index: any) => (
                                    <tr key={item.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {transformNumber(
                                          item?.release_token / DECIMAL
                                        )}
                                      </td>
                                      <td>
                                        {moment(item?.unlock_at).format(
                                          "D-MMM-YYYY HH:mm"
                                        )}
                                      </td>
                                      <td>
                                        {moment(item?.mature_at).format(
                                          "D-MMM-YYYY HH:mm"
                                        )}
                                      </td>
                                      <td>
                                        {item?.status === "lock" ? (
                                          <>
                                            <LockIcon /> Locked
                                          </>
                                        ) : item?.status === "open" ? (
                                          "Vesting"
                                        ) : item?.status === "close" ? (
                                          "Matured"
                                        ) : (
                                          item?.status
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <div className="no_record_box text-center">
                                    <p>No Record Found</p>
                                  </div>
                                )}
                              </CustomTable>
                            </div>
                          </Collapse>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={headers.length}>
                      <div className="no_record_box text-center">
                        <p>No Record Found</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
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
          <Tab eventKey="failed" title="Failed orders">
            <CustomTable fields={fields}>
              {historyData?.length > 0
                ? historyData?.map((item: any, index) => (
                    <tr key={item?.id}>
                      <td>{LIMIT * (page2 - 1) + index + 1}</td>
                      <td>{item?.coinName}</td>
                      <td>{transformNumber(item?.amount / DECIMAL)}</td>
                      {/* <td>{item?.token_amount / DECIMAL}</td> */}
                      <td>
                        {moment(item?.createdAt).format("D-MMM-YYYY HH:mm")}
                      </td>
                      <td>{item?.status}</td>
                    </tr>
                  ))
                : null}
            </CustomTable>
            {historyData &&
            historyData.length &&
            totalRecords >= LIMIT &&
            !skeletonLoader ? (
              <div className="field d-flex align-items-center justify-content-center mt-4">
                <Paginations
                  countData={failedListCount}
                  pageChanges={pageChangesFailed}
                  limit={LIMIT}
                  activePage={page2}
                />
              </div>
            ) : null}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default ExpandableTable;
