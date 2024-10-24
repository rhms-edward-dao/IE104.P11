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
        <p className="my-10 text-center font-light text-md">Danh sách rỗng</p>
      ) : (
        <ReactPaginate
          breakLabel={<span className="mx-4">...</span>}
          nextLabel={
            showNextButton ? (
              <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md mx-4">
                <BsChevronRight />
              </span>
            ) : null
          }
          onPageChange={handleChangePage}
          pageCount={pageCount}
          previousLabel={
            showPrevButton ? (
              <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md mr-4">
                <BsChevronLeft />
              </span>
            ) : null
          }
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center mt-8 mb-4"
          pageClassName="block border- border-solid border-gray-200 hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded-md"
          activeClassName="bg-red-500 text-white"
        />
      )}
    </div>
  );
};
export default PaginationButtons;
