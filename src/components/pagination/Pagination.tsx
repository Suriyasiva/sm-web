import React, { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import SecondaryButton from '../common/SecondaryButton';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { DOTS, usePagination } from '../../hooks/usePagination';

interface IProps {
  totalCount: number;
  dataPerPage?: number;
  totalPage?: number;
  currentPage?: number;
  onPageChange: (currentPageNumber?: number) => void;
}

const PaginationRange: React.FC<IProps> = (props: IProps) => {
  const existingQueryParams = Object.fromEntries(
    new URLSearchParams(location.search),
  );

  // constants
  const constantButtons: number = 3; // it is first page last page dots
  const siblingCount: number = 1;

  const dataPerPage = props.dataPerPage || 10;

  // states
  const [totalPageCount, setTotalPageCount] = useState(
    props.totalPage || Math.ceil(props.totalCount / dataPerPage),
  ); //totalPage  = Math.ceil(totalCount / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(
    +existingQueryParams['page'] || props.currentPage || 1,
  ); // initial page = 1

  useEffect(() => {
    if (props.totalPage) {
      setTotalPageCount(props.totalPage);
    }
    if (props.currentPage) {
      setCurrentPage(props.currentPage);
    }
  }, [props.totalPage, props.currentPage]);

  //  other hooks
  const paginationRange = usePagination({
    totalPageCount,
    constantButtons: constantButtons,
    siblingCount: siblingCount,
    currentPage,
  });

  //  utils
  function goToNextPage() {
    setCurrentPage((page) => page + 1); // next page
    props.onPageChange(currentPage + 1);
  }

  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1); // previous page
    props.onPageChange(currentPage - 1);
  }

  function onPageClick(selectedPage: number) {
    setCurrentPage(selectedPage);
    props.onPageChange(selectedPage);
  }

  return (
    <Flex w={'100%'} justifyContent={'space-between'}>
      <SecondaryButton
        onClick={gotToPreviousPage}
        isDisabled={currentPage === 1}
        leftIcon={<GrLinkPrevious />}
        px={3}
        fontWeight='bold'
      >
        Previous
      </SecondaryButton>

      <Box>
        {paginationRange?.map((pageNumber: string | number, index: number) => {
          if (String(pageNumber) === DOTS) {
            return (
              <Button
                key={`pagination-dots-${index}`}
                fontWeight='hairline'
                colorScheme='white'
                variant='ghost'
                boxShadow='none'
                color='gray.600'
                border='none'
                _hover={{ boxShadow: 'none', border: 'none' }}
                disabled
              >
                ...
              </Button>
            );
          }
          return (
            <Button
              key={`pagination-pageNumber-${pageNumber}`}
              fontWeight='hairline'
              colorScheme='white'
              variant='ghost'
              boxShadow='none'
              color={pageNumber === currentPage ? 'gray.600' : 'inherit'}
              bg={pageNumber === currentPage ? 'gray.100' : 'transparent'}
              border='none'
              _hover={{ boxShadow: 'none', border: 'none' }}
              onClick={() => {
                if (currentPage != pageNumber) {
                  onPageClick(+pageNumber);
                }
              }}
            >
              {pageNumber}
            </Button>
          );
        })}
      </Box>

      <SecondaryButton
        onClick={goToNextPage}
        isDisabled={currentPage === totalPageCount}
        rightIcon={<GrLinkNext />}
        px={3}
        fontWeight='bold'
      >
        Next
      </SecondaryButton>
    </Flex>
  );
};

export default PaginationRange;
