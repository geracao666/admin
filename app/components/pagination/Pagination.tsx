import { Pagination as DPagination, Button } from "react-daisyui";
import { PaginationProps } from "./Pagination.d";

export default function Pagination({
  page,
  limit,
  color,
  total = 0,
  range = 1,
  margin = 2,
  separator = '...',
  onPageSelected = () => {}
}: PaginationProps) {
  const pages = Array.from({ length: Math.ceil(total / limit) }, (_, pageIndex) => pageIndex)
  const left = pages.slice(0, margin)
  const right = pages.slice(margin * -1)
  const middle = pages.slice(
    Math.max(0, page - range - 1),
    Math.min(pages.length, page + range)
  )

  const pageNumbers = Array.from(
    new Set([...left, ...middle, ...right]),
    (pageNumber) => pageNumber + 1
  )

  const handlePageSelected = (pageNumber: number) => () => {
    if (pageNumber === page) {
      return
    }

    onPageSelected(pageNumber)
  }

  return (
    <DPagination>
      {pageNumbers.map((pageNumber, index) => (
        <>
          <Button
            className="join-item"
            key={index}
            color={color}
            active={pageNumber === page}
            onClick={handlePageSelected(pageNumber)}
          >
            {pageNumber}
          </Button>

          {index !== pageNumbers.length - 1 && pageNumbers[index + 1] - pageNumber > 1 && (
            <Button className="join-item" color={color}>
              {separator}
            </Button>
          )}
        </>
      ))}
    </DPagination>
  )
}