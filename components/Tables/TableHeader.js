import React from 'react';
import {TableHead, TableCell, TableRow,
  TableSortLabel, Tooltip
} from '@material-ui/core';
import PropTypes from 'prop-types';

const SELECTION_COLUMN_ID = 'selection';

const TableHeader = ({className, headerGroups, style={}})=>{

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
    <TableHead className={className} style={style}>
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
