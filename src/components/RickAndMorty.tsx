import React from 'react';
import Card from './MediaCard';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { IPaginationInfo, IResponse, IRickAndMorty } from '../types';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
  },
  cardsContainer: {
    paddingTop: 80,
    display: 'flex',
    overflow: 'scroll',
    flexWrap: 'wrap',
    padding: 10,
    paddingBottom: 80,
  },
  paginationContainer: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'fixed',
    bottom: 0,
    justifyContent: 'center',
    background: '#fff',
    width: '100%',
  }
});


export default function RickAndMorty() {
  const classes = useStyles();

  const searchParams = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params;
  }

  const setPageFromQueryString = () => {
    const params = searchParams();
    const pageFromUrl = params.get('page');
    if (pageFromUrl) {
      return parseInt(pageFromUrl);
    }
    return 1;
  }

  const updateQueryString = (page: number) => {
    const params = searchParams();
    params.set('page', `${page}`);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

  const [pageData, setPageData] = React.useState<IRickAndMorty[]>([]);
  const [currPage, setCurrentPage] = React.useState<number>(setPageFromQueryString());
  const cardContainerRef = React.createRef<HTMLDivElement>();
  const [paginationInfo, setPaginationInfo] = React.useState<IPaginationInfo>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  React.useEffect(() => {
    fetchData(currPage);
  }, [currPage]);

  React.useLayoutEffect(() => {
    if(pageData.length > 0) {
      cardContainerRef.current?.scrollIntoView();
    }
  }, [pageData, cardContainerRef]);

  const fetchData = (page: number) => fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then((data: IResponse) => {
      setPageData(data.results);
      setPaginationInfo(data.info);
    });

  const handlePageClick = (event: object, page: number) => {
    setCurrentPage(page);
    updateQueryString(page);
  }

  return (
    <Box className={classes.main}>
        <div className={classes.cardsContainer} ref={cardContainerRef}>
            {
                pageData.map((cardData, idx) => <Card key={idx} cardData={cardData}/>)
            }
        </div>
        <Box className={classes.paginationContainer}>
            <Pagination page={currPage} count={paginationInfo.pages} onChange={handlePageClick}/>
        </Box>
    </Box>
  );
};

