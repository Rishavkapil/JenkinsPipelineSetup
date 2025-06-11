"use client";
import React, { ReactNode } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./style.scss";
import { InfoIcon } from "@/app/_ui/svg/_svg";

interface CustomTableProps {
  className?: string;
  fields?: any;
  sortbuttons?: boolean;
  children?: ReactNode;
  noRecordFound?: ReactNode;
  skeletonLoader?: boolean;
}

const CustomTable = ({
  className = "",
  fields = [],
  children,
  skeletonLoader,
}: CustomTableProps) => {
  const unlockedAt =
    "Digital tokens are secured and are inaccessible, and cannot be claimed";
  const maturedAt =
    "The phase that starts once the initial lockup ends, enabling users to claim their tokens according to a  vesting schedule.";

  return (
    <Table responsive borderless={true} className={`common_table ${className}`}>
      {fields && (
        <thead>
          <tr>
            {fields.map((item: any, key: any) => (
              <th key={key}>
                {item.label}{" "}
                {(item?.label === "UNLOCKED AT" ||
                  item?.label === "MATURED AT") && (
                  <span
                    className="info_icon"
                    title={
                      item?.label === "UNLOCKED AT" ? unlockedAt : maturedAt
                    }
                  >
                    <InfoIcon fill="#000" />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
      )}
      {!skeletonLoader ? (
        <>
          <tbody>
            {children || (
              <tr>
                <td colSpan={fields.length}>
                  <div className="no_record_box text-center">
                    <p>No Record Found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </>
      ) : (
        <>
          <thead>
            <tr>
              {fields?.map((items: any, index: any) => {
                return (
                  // <th key={index} className={items.ThClass}>
                  //   {items.name}
                  // </th>
                  items && (
                    <th key={index} className="">
                      <Skeleton
                        containerClassName="skeletonContainer"
                        className="skeletonLoading"
                      />
                    </th>
                  )
                );
              })}
            </tr>
          </thead>
          <tbody>
            {fields?.map((_: any, index: any) => {
              return (
                <tr key={index}>
                  {fields?.map((items: any, index: any) => {
                    return (
                      items && (
                        <td key={index} className="">
                          <Skeleton
                            containerClassName="skeletonContainer"
                            className="skeletonLoading"
                          />
                        </td>
                      )
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </Table>
  );
};
CustomTable.defaultProps = {
  sortbuttons: true,
};
export default CustomTable;
