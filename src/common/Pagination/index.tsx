import Pagination from "react-js-pagination";
import "./style.scss";
import { LIMIT } from "@/constants";
interface propType {
  countData: number;
  activePage: number;
  limit: number;
  pageChanges?: (pageNumber: number) => void;
  className?: string;
}

export default function Paginations(props: propType) {
  const { countData, activePage, limit, pageChanges } = props;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageChanges) {
      setTimeout(scrollToTop, 0);
      pageChanges(pageNumber); // Trigger parent handler
    }
  };

  return (
    <>
      {countData / LIMIT > 1 && (
        <div className="pagination-style">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={countData}
            // pageRangeDisplayed={countData > 50 ? 5 : Math.ceil(countData / 10)}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
