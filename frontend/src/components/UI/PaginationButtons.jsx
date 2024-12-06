import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const PaginationButtons = ({ pageCount, currentPage, setCurrentPage }) => {
  const handleChangePage = ({ selected }) => {
    setCurrentPage(selected);
  };
  const showNextButton = currentPage !== pageCount - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <div>
      {pageCount === 0 ? (
        <p className="text-md my-10 text-center font-light text-black transition-colors duration-300 dark:text-white">
          Danh sách rỗng
        </p>
      ) : (
        <ReactPaginate
          breakLabel={
            <span className="mx-4 text-black dark:text-white transition-colors duration-300">
              ...
            </span>
          }
          nextLabel={
            showNextButton ? (
              <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md mx-4 hover:bg-red-500 hover:text-white text-black transition-colors duration-300">
                <BsChevronRight />
              </span>
            ) : null
          }
          onPageChange={handleChangePage}
          pageCount={pageCount}
          previousLabel={
            showPrevButton ? (
              <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md mr-4 hover:bg-red-500 hover:text-white text-black transition-colors duration-300">
                <BsChevronLeft />
              </span>
            ) : null
          }
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center mt-8 mb-4"
          pageClassName="block border-solid border-gray-200 hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded-md text-black dark:text-white dark:hover:text-black m-1 transition-colors duration-300"
          activeClassName="bg-red-500 text-white"
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
        />
      )}
    </div>
  );
};
export default PaginationButtons;
