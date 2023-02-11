import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import { useConfig } from "@/Hooks";

const Pagination = ({ className, page, pageCount, goToPage }) => {
    const { getConfig } = useConfig();

    const liClasses = getConfig("theme.pagination.li", "-ml-px inline-flex bg-white");
    const disabledClasses = getConfig("theme.pagination.disabled", "opacity-50");
    const aClasses = getConfig("theme.pagination.link", "px-4 py-2 border border-gray-300 text-sm leading-5 font-medium focus:outline-none active:text-gray-700 transition ease-in-out duration-150 hover:opacity-75");
    const activeLinkClass = getConfig("theme.pagination.activeLink", "bg-indigo-600 text-white border-indigo-600");

    const handlePageChange = (page) => {
        // React pagination starts from 0 instead of 1, increment by 1
        goToPage(page.selected + 1);
    };

    return (
        <div className={`${getConfig("theme.pagination.container") ?? "rounded-lg"} ${className}`}>
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                forcePage={page - 1}
                onPageChange={handlePageChange}
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageClassName={liClasses}
                previousClassName={`${liClasses} rounded-l-lg`}
                breakClassName={liClasses}
                nextClassName={`${liClasses} rounded-r-lg`}
                disabledClassName={disabledClasses}
                pageLinkClassName={aClasses}
                breakLinkClassName={aClasses}
                previousLinkClassName={`${aClasses} bg-white rounded-l-lg`}
                nextLinkClassName={`${aClasses} bg-white  rounded-r-lg`}
                activeLinkClassName={activeLinkClass}
            />
        </div>
    );
};

Pagination.propTypes = {
    className: PropTypes.string,
    page: PropTypes.number,
    pageCount: PropTypes.number,
    goToPage: PropTypes.func,
};

export default Pagination;
