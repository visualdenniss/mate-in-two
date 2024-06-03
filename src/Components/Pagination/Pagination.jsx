import React from "react";
import "./Pagination.css";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <a
        href="#!"
        className="pagination-nav"
        onClick={() => paginate(currentPage - 1)}
      >
        <IoArrowBackOutline />
      </a>
      {pageNumbers.map((number) => (
        <a
          href="#!"
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </a>
      ))}
      <a
        href="#!"
        className="pagination-nav"
        onClick={() => paginate(currentPage + 1)}
      >
        <IoArrowForwardOutline />
      </a>
    </div>
  );
};

export default Pagination;
