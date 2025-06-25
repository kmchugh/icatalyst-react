import React from 'react';
import {TablePagination as NativeTablePagination} from '@mui/material';
import PaginationActions from './PaginationActions';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      flexShrink: 0,
      paddingLeft: theme.spacingNum(2),
      paddingRight: theme.spacingNum(2),
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
      [theme.breakpoints.down('md')]: {
        padding: theme.spacingNum(1),
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
        '& .MuiTablePagination-select' : {
          alignSelf: 'center'
        }
      }
    },
    paginationRoot: {
      // Fix for mui pagination root
      '&:last-child' : {
        paddingLeft: theme.spacingNum(2),
        paddingRight: theme.spacingNum(2),
      },

      [theme.breakpoints.down('md')]: {
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
  onChangeRowsPerPage,
  title='Rows'
})=>{
  const classes = useStyles();

  return (
    <NativeTablePagination
      className={cxMui(classes.root)}
      classes= {{
        root : classes.paginationRoot,
        toolbar : classes.paginationToolbar,
        selectIcon : classes.paginationSelectIcon
      }}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage={`${title} per page`}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
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
  title : PropTypes.string
};

export default TablePagination;
