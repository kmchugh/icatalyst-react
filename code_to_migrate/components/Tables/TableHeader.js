import React from 'react';
import {TableHead, TableCell, TableRow,
  TableSortLabel, Tooltip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const SELECTION_COLUMN_ID = 'selection';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.action.selected,
      color: `${mostReadable(
        tinycolor(theme.palette.background.default),
        [
          theme.palette.text.secondary,
          theme.palette.primary.main,
        ], {}
      ).toHexString()}!important`,

      ['& .MuiTableCell-head'] : {
        fontWeight: 'bold'
      },
      ['& .MuiTableSortLabel-active, & .MuiTableSortLabel-icon'] : {
        color : `${mostReadable(
          tinycolor(theme.palette.action.selected),
          [
            theme.palette.text.secondary,
            theme.palette.primary.main,
          ], {}
        ).toHexString()}`,
      },
    },
  };
});

const TableHeader = ({className, headerGroups, style={}})=>{

  const classes= useStyles();

  const sortableHeader = (column, header)=>{
    return column.canSort ? (
      <Tooltip
        title="Click to change sort"
        placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
        enterDelay={300}>
        <TableSortLabel
          active={column.isSorted}
          direction={column.isSortedDesc ? 'desc' : 'asc'}>
          {header}
        </TableSortLabel>
      </Tooltip>
    ) : header;
  };
  return (
    <TableHead className={clsx(classes.root, className)} style={style}>
      {
        headerGroups.map((headerGroup)=>{
          const {key, ...headerProps} = headerGroup.getHeaderGroupProps();
          return (
            <TableRow key={key} {...headerProps}>
              {
                headerGroup.headers.map((column)=>{
                  return (
                    <TableCell
                      width={column.width}
                      key={column.id}
                      {...(column.id === SELECTION_COLUMN_ID ?
                        column.getHeaderProps() :
                        column.getHeaderProps(column.getSortByToggleProps()))}
                    >
                      {sortableHeader(column, column.render('Header'))}
                    </TableCell>
                  );
                })
              }
            </TableRow>
          );
        })
      }
    </TableHead>
  );
};

export default TableHeader;

TableHeader.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  headerGroups: PropTypes.array.isRequired,
  style : PropTypes.object
};
