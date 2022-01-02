import React, {useState, useContext, useEffect, useLayoutEffect, useRef} from 'react';
import {Table as MuiTable, TableContainer, Checkbox } from '@material-ui/core';
import {
  ToggleButtonGroup, ToggleButton
} from '@material-ui/lab';
import {useGlobalFilter, usePagination,
  useRowSelect, useSortBy,
  useTable
} from 'react-table';
import {FuseLoading} from '../fuse';
import { makeStyles } from '@material-ui/core/styles';
import {ThemeProvider, Tooltip} from '@material-ui/core';
import clsx from 'clsx';
import Icon from '../Icon';
import EmptyTable from './EmptyTable';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import PropTypes from 'prop-types';
import {DefaultCell, getCellComponent} from './Cells';
import {SearchFilterContext} from './SearchFilterProvider';
import ClearableInput from '../ClearableInput';
import TablePagination from './TablePagination';
import {useSettingsContext} from '../Settings/SettingsProvider';
import {registerSettings} from '../Settings/SettingsProvider';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const TABLE_SETTINGS_ID = 'icat_table';

/**
 * Register the Table Settings with the settings provider
 * so they can be managed by the user
 * @type {[type]}
 */
registerSettings({
  name : TABLE_SETTINGS_ID,
  sectionName : 'userInterface',
  label : 'table',
  icon : 'table',
  getInstanceSettingsID : ({match})=>{
    return CryptoJS.MD5(match.path).toString();
  },
  fields : [
    {
      id : 'density',
      type : 'select',
      default : 'regular',
      options : [{
        id : 'condensed'
      },{
        id : 'regular',
      },{
        id : 'expanded',
      }]
    }, {
      id : 'rowsPerPage',
      type : 'select',
      default : 10,
      options : [
        {
          id : '10',
          value : 10,
        },{
          id : '25',
          value : 25,
        },{
          id : '50',
          value : 50,
        },{
          id : '100',
          value : 100,
        }
      ]
    }
  ]
});




const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      '&.density-regular' : {
      },
      '&.density-condensed' : {
      },
      '&.density-condensed .MuiTableCell-root' : {
        paddingTop: 0,
        paddingBottom: 0,

        '& > *' : {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace : 'nowrap'
        }
      },
      '&.density-condensed .MuiTableRow-root' : {
        height: 'auto!important'
      },
      '&.density-expanded .MuiTableCell-root' : {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      '&.density-expanded .MuiTableRow-root' : {
        height: theme.spacing(10)
      },
    },
    tableWrapper:  {
      flexGrow: 1,
      minHeight: 0,
      maxHeight: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    table : {
      flexGrow: 1,
      flex: 1,
      flexShrink: 1,
      overflow: 'inherit',
      width: '100%',
      tableLayout: 'fixed',

      '& thead, & tbody, & tr' : {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed'
      },

      '& $tableBody' : {
        display: 'block'
      },
    },
    tableToolbar :{
      flexShrink: 0,
    },
    tableHeader : {

    },
    tableHeaderCheckbox : {
      fontWeight: 'bold'
    },
    tableBody : {
      overflowY: 'auto',
      overflowX: 'hidden'
    },
    tableScroll : {
      flex: 1,
      flexGrow: 1,
      flexShrink: 0,
      overflowX: 'auto'
    },
    tableFooter : {
    },
    paginationToolbar: {
    },
    paginationRoot: {
    },
  };
});




const Table = ({
  columns,
  data,
  onRowClicked,
  onAddClicked,
  onDeleteClicked,
  onRefresh,
  updating,
  EmptyListComponent = <EmptyTable/>,
  className,
  title,
  canAdd,
  canDelete,
  icon,
  isSelectable = ()=>true,
  match
})=>{

  const skipPageReset = true;
  const updateData = ()=>{};

  const themes = useSelector(({icatalyst}) => icatalyst.settings.current.themes);

  const tableSettings = useSettingsContext(TABLE_SETTINGS_ID, {location, match});
  const {
    values : reducerValues,
    instanceID : settingsInstanceID,
    updateSettings,
  } = tableSettings;

  const [tableHeight, setTableHeight] = useState(null);
  const [tableWidth, setTableWidth] = useState(null);

  // Update the initial settings from the stored user settings
  const [mode, setMode] = useState(reducerValues.density);

  const _tableRef = useRef();

  useLayoutEffect(() => {
    if (_tableRef.current) {
      const measure = ()=>{
        const containingElement = _tableRef.current.parentNode;
        const height = containingElement.clientHeight;
        const headerElement = containingElement.querySelector(`.${clsx(classes.tableHeader)}`);

        const headerHeight = headerElement ? headerElement.clientHeight : 0;
        const newHeight = height - headerHeight;
        const newWidth = containingElement.clientWidth;

        if (tableHeight && tableHeight !== newHeight) {
          setTableHeight(newHeight);
        }
        if (tableWidth && tableWidth !== newWidth) {
          setTableWidth(newWidth);
        }
      };

      window.addEventListener('resize', measure);
      measure();
      return ()=>{
        window.removeEventListener('resize', measure);
      };
    }
  });

  const {
    searchFilter,
    setSearchFilter
  } = useContext(SearchFilterContext);

  useEffect(()=>{
    setGlobalFilter(searchFilter);
  }, [searchFilter]);

  const [columnDefinitions] = useState(columns.map((column)=>{
    return {
      Header : column.label,
      accessor : column.getValue ? column.getValue : column.id,
      canSort : column.sortable,
      sortType : column.sortType || 'alphanumeric',
      // If the cell has a render method then let it render itself
      Cell : column.cell || getCellComponent(column.render ? 'custom' : column.type),
      field : column,
      width : column.width,
      minWidth : column.minWidth,
      maxWidth : column.maxWidth,
      // TODO: Add other properties from react-table
    };
  }));

  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    // preGlobalFilteredRows,
    state : {
      pageIndex, pageSize,
      selectedRowIds,
    }
  } = useTable({
    columns: columnDefinitions,
    data,
    defaultColumn : {
      Cell: DefaultCell
    },
    autoResetPage:  !skipPageReset,
    updateData,
    initialState : {
      pageSize: reducerValues.rowsPerPage
    }
  },
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
  (hooks) => {

    // If selectable
    const Header = (props)=>{
      const { getToggleAllRowsSelectedProps, rows, toggleRowSelected} = props;
      return (
        <div className="max-w-42">
          <Checkbox className={clsx(classes.tableHeaderCheckbox)} {...getToggleAllRowsSelectedProps()} onChange={(e)=>{
            rows.forEach((r)=>{
              if (isSelectable(r.original)) {
                toggleRowSelected(r.id, e.target.checked);
              }
            });
          }}/>
        </div>
      );
    };
    Header.propTypes  = {
      getToggleAllRowsSelectedProps : PropTypes.func.isRequired,
      toggleRowSelected : PropTypes.func.isRequired,
      rows : PropTypes.array.isRequired,
    };

    const Cell = ({row})=>{
      const {onChange, ...toggleRowSelectedProps} = row.getToggleRowSelectedProps();
      return isSelectable(row.original) &&  (
        <div onClick={(e)=>{
          e.stopPropagation();
        }} className="max-w-42">
          <Checkbox
            color="primary"
            onChange={(e)=>{
              return onChange(e);
            }}
            {...toggleRowSelectedProps}
          />
        </div>
      );
    };
    Cell.propTypes = {
      row : PropTypes.shape({
        getToggleRowSelectedProps : PropTypes.func.isRequired,
        original : PropTypes.object
      })
    };

    hooks.allColumns.push((columns)=>[{
      id : 'selection',
      Header: Header,
      Cell: Cell,
      canSort: false,
      width : 64
    }, ...columns]);
  });

  if (columns.length === 0) {
    console.warn('column definitions not provided');
  }

  useEffect(()=>{
    const {values, defaults} = tableSettings;
    const density = values.density !== undefined ? values.density : defaults.density;
    const rowsPerPage = values.rowsPerPage !== undefined ? values.rowsPerPage : defaults.rowsPerPage;
    if (density !== mode) {
      setMode(density);
    }

    if (pageSize !== rowsPerPage){
      setPageSize(rowsPerPage);
    }
  }, [tableSettings]);

  function handleChangePage(event, value) {
    gotoPage(value);
  }

  function handleChangeRowsPerPage(event) {
    updateSettings((values)=>{
      return {
        ...values,
        rowsPerPage : event.target.value
      };
    }, settingsInstanceID);
  }

  return (
    <div ref={_tableRef} className={clsx(classes.root, className, `density-${mode}`)}>
      {updating && <FuseLoading/>}

      {!updating && (!data || data.length === 0) && (
        EmptyListComponent
      )}

      {!updating && data && data.length > 0 && (
        <TableContainer className={clsx(classes.tableWrapper)}>
          <ThemeProvider theme={themes.toolbarTheme}>
            <TableToolbar
              className={clsx(classes.tableToolbar)}
              title={title}
              icon={icon}
              inputComponent={
                <ClearableInput
                  label="search"
                  icon="search"
                  value={searchFilter}
                  onChange={setSearchFilter}
                />
              }
              actions={[{
                title : 'delete',
                icon : 'delete',
                onClick : ()=>{
                  onDeleteClicked && onDeleteClicked(data.filter((d, i)=>selectedRowIds[i] === true));
                },
                show : canDelete && Object.keys(selectedRowIds).length > 0,
              },{
                title : 'add',
                icon : 'add',
                onClick : ()=>{
                  onAddClicked && onAddClicked();
                },
                show : canAdd && Object.keys(selectedRowIds).length === 0
              }].filter(i=>i.show)}
              switchComponent={
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  onChange={(e, mode)=>{
                    updateSettings((values)=>{
                      return {
                        ...values,
                        density : mode
                      };
                    }, settingsInstanceID);
                  }}
                  aria-label="table size"
                >
                  <Tooltip title="condensed" value="condensed">
                    <ToggleButton className={clsx(classes.toggleButton)} aria-label="condensed">
                      <Icon>format_align_justify</Icon>
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="regular" value="regular">
                    <ToggleButton className={clsx(classes.toggleButton)} aria-label="regular">
                      <Icon>view_headline</Icon>
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="expanded" value="expanded">
                    <ToggleButton className={clsx(classes.toggleButton)} aria-label="expanded">
                      <Icon>menu</Icon>
                    </ToggleButton>
                  </Tooltip>
                </ToggleButtonGroup>
              }
            />
          </ThemeProvider>

          <div className={clsx(classes.tableScroll, 'flex-1')}>
            <MuiTable className={clsx(classes.table)} {...getTableProps()}>
              <TableHeader
                className={clsx(classes.tableHeader)}
                headerGroups={headerGroups}
                style={{
                  width: tableWidth
                }}
              />

              <TableBody
                className={clsx(classes.tableBody)}
                style={{
                  maxHeight: tableHeight,
                  width: tableWidth
                }}
                onRowClicked={onRowClicked}
                prepareRow={prepareRow}
                page={page}
                {...getTableBodyProps()}
              />

            </MuiTable>
          </div>

          <ThemeProvider theme={themes.footerTheme}>
            <TablePagination
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              onRefresh={onRefresh}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ThemeProvider>
        </TableContainer>
      )}
    </div>
  );
};

Table.propTypes = {
  columns : PropTypes.arrayOf(
    PropTypes.shape({
      id : PropTypes.string.isRequired,
      type : PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right']),
      label : PropTypes.string,
      maxLength: PropTypes.number,
      minLength: PropTypes.number,
      required: PropTypes.bool,
      sortable: PropTypes.bool,
    })
  ).isRequired,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  data : PropTypes.array,
  updating: PropTypes.bool,
  EmptyListComponent : PropTypes.node,
  getRowID : PropTypes.func,
  onRowClicked : PropTypes.func,
  onRefresh : PropTypes.func,
  title : PropTypes.string,
  icon : PropTypes.string,
  canAdd : PropTypes.bool,
  canDelete : PropTypes.bool,
  onAddClicked : PropTypes.func,
  onDeleteClicked : PropTypes.func,
  isSelectable : PropTypes.func,
};

export default withRouter(Table);
