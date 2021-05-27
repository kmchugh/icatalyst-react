import React from 'react';
import {TablePagination as NativeTablePagination} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PaginationActions from './PaginationActions';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      flexShrink: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderTop: `thin solid ${theme.palette.divider}`,
      background: theme.palette.background.default,
      color: `${mostReadable(
        tinycolor(theme.palette.background.default),
        [
          theme.palette.text.secondary,
          theme.palette.primary.main,
        ], {}
      ).toHexString()}!important`,
    },
    paginationToolbar: {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        textAlign: 'center',

        '& > *' : {
          margin:0,
        },
        '& > p:first-of-type' : {
          display: 'none'
        },
        '& .MuiTablePagination-input' : {
          alignSelf: 'center'
        }
      }
    },
    paginationRoot: {
      // Fix for mui pagination root
      '&:last-child' : {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },

      [theme.breakpoints.down('sm')]: {
        overflow: 'hidden',
        '&:last-child' : {
          padding: 0
        }
      },
    },
    paginationSelectIcon : {

    }
  };
});




const TablePagination = ({
  count,
  page,
  rowsPerPage,
  onRefresh,
  onChangePage,
  onChangeRowsPerPage
})=>{
  const classes = useStyles();

  return (
    <NativeTablePagination
      className={clsx(classes.root)}
      classes= {{
        root : classes.paginationRoot,
        toolbar : classes.paginationToolbar,
        selectIcon : classes.paginationSelectIcon
      }}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {'aria-label': 'rows per page'},
      }}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      ActionsComponent={(props)=>(
        <PaginationActions {...props} onRefresh={onRefresh}/>
      )}
    />
  );
};

TablePagination.propTypes = {
  count : PropTypes.number.isRequired,
  rowsPerPage : PropTypes.number.isRequired,
  page : PropTypes.number.isRequired,
  onRefresh : PropTypes.func.isRequired,
  onChangePage : PropTypes.func.isRequired,
  onChangeRowsPerPage : PropTypes.func.isRequired,
};

export default TablePagination;
