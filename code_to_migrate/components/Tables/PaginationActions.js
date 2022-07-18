import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '../IconButton';


const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      justifyContent: 'center'
    },
    paginationNav : {
      marginRight: theme.spacing(1)
    }
  };
});

const PaginationActions = ({
  className,
  count, page,
  rowsPerPage, onPageChange,
  onRefresh
})=>{
  const classes = useStyles();
  const theme = useTheme();

  const handleFirstPageButtonClick = ()=>{
    onPageChange(event, 0);
  };

  const handleBackButtonClick = ()=>{
    onPageChange(event, page - 1 );
  };

  const handleNextButtonClick = ()=>{
    onPageChange(event, page + 1 );
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={clsx(classes.root, className)}>

      <div className={clsx(classes.paginationNav)}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          size="small"
          disabled={page === 0}
          title="first page"
          icon={theme.direction === 'rtl' ? 'last_page' : 'first_page'}
        />

        <IconButton
          onClick={handleBackButtonClick}
          size="small"
          disabled={page === 0}
          title="previous page"
          icon={theme.direction === 'rtl' ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}
        />

        <IconButton
          onClick={handleNextButtonClick}
          size="small"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          title="next page"
          icon={theme.direction === 'rtl' ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
        />

        <IconButton
          onClick={handleLastPageButtonClick}
          size="small"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          title="last page"
          icon={theme.direction === 'rtl' ? 'first_page' : 'last_page'}
        />
      </div>

      {
        onRefresh && <IconButton
          onClick={onRefresh}
          size="small"
          disabled={false}
          title="refresh"
          icon="sync"
        />
      }

    </div>
  );
};

PaginationActions.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onPageChange : PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onRefresh : PropTypes.func
};

export default PaginationActions;
