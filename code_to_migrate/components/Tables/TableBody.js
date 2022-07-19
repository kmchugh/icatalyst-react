import React from 'react';
import {TableBody as MUITableBody, TableRow, TableCell} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableBody = ({
  prepareRow,
  page,
  className,
  style = {},
  onRowClicked
})=>{

  return (
    <MUITableBody className={className} style={style}>
      {page.map((row)=>{
        prepareRow(row);
        const {key, ...rowProps} = row.getRowProps();
        const handleRowClick = ()=>{
          onRowClicked && onRowClicked(row.original);
        };
        return (
          <TableRow
            className="h-64 cursor-pointer"
            onClick={handleRowClick}
            aria-selected={row.isSelected}
            hover
            tabIndex={-1}
            selected={row.isSelected}
            key={key} {...rowProps}>
            {
              row.cells.map((cell)=>{
                const {column} = cell;
                return (
                  <TableCell
                    key={cell.id}
                    width={column.width}
                    {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })
            }
          </TableRow>
        );
      })}
    </MUITableBody>
  );
};

export default TableBody;

TableBody.propTypes = {
  prepareRow: PropTypes.func.isRequired,
  page : PropTypes.array,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style : PropTypes.object,
  onRowClicked : PropTypes.func
};
