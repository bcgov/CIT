import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

export default function Paginator({
  count,
  setCurrentPage,
  currentPage,
  pageSize,
}) {
  const totalPages = Math.ceil(count / pageSize);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationItems = () => {
    const start = currentPage - 2 > 0 ? currentPage - 2 : 1;
    const end = currentPage < totalPages - 2 ? currentPage + 2 : totalPages;
    const items = [];
    // eslint-disable-next-line no-plusplus
    for (let i = start; i <= (end < 5 ? 5 : end); i++) {
      items.push(
        <Pagination.Item
          key={i}
          onClick={() => handlePageClick(i)}
          active={i === currentPage}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems()}
      <Pagination.Next
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

Paginator.propTypes = {
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
