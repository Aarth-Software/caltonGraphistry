import { useState } from "react";

const usePagination = (elements, fixElements, containerHeight, itemHeight) => {
  // console.log(containerHeight);
  const [page, setPage] = useState(1);
  const itemsPerPage = !!containerHeight
    ? Math.floor(containerHeight / itemHeight)
    : fixElements;
  console.log(itemsPerPage);
  const pages = Math.ceil(elements.length / itemsPerPage);
  const pageElements = elements.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const prevClick = () => {
    if (page > 1) setPage(page - 1);
  };
  const nextClick = () => {
    if (page < pages) setPage(page + 1);
  };
  return { pageElements, page, pages, prevClick, nextClick, setPage };
};

export default usePagination;
