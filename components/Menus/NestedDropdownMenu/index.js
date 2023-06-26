import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

import {
  ListSubheader,
  List,
  Popover,
  Paper,
  ClickAwayListener,
  Button,
  Icon,
} from '@material-ui/core';
import IconButton from '../../IconButton';
import MenuItem from './component/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
// import { generateUUID } from '../../../utilities/generateUUID';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: 360, 
    maxHeight: '50vh',
    overflow: 'auto'
  },
  list: {
    width: '100%',
    maxWidth: 360,
    marginTop: theme.spacing(1)
  },
  subHeader : {
    background: theme.palette.background.paper,
  },
  addMoreButton: {
    paddingLeft: theme.spacing(2),
    fontWeight: 400,
    fontSize: 12,
    color: theme.palette.text
  },
  listItemText: {
    '& span': {
      color : 'grey'
    },
  },
}));

const NestedDropdownMenu = ({ 
  data,
  onAddNewItem,
  primaryKey,
  childKey,
  isCreate,
  styles,
  onEditItem,
  onDeleteItem,
  iconTitle,
  icon,
  isOpen,
  subHeader = '',
  className,
  ...props
})=>{

  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setIsOpen] = useState(isOpen || false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(data);
  }, [data]);

  const handleClick = (data, id) => {
    onAddNewItem(id, data, menuItems);
  };

  const addNewItem = () => {
    onAddNewItem(null, null, menuItems);
  };
  const OnEditChildItems =(data)=>{
    onEditItem(data);
  };

  const onDeleteClick = (data) => {
    if (onDeleteItem) {
      setIsOpen(false);
      onDeleteItem(data);
    }
  };

  return (
    <div className={clsx(classes.root, className)} style={styles.root}>
      <IconButton
        title={iconTitle}
        icon={icon}
        onClick={(e)=>{
          setIsOpen(true);
          setAnchorEl(e.currentTarget);
        }}
      />
      <Popover open={open} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: -300 }} classes={{paper : className}}>
        <ClickAwayListener onClickAway={() => {
          setIsOpen(false);
          setAnchorEl(null);
        }}>
          <Paper className={clsx(classes.paper)} style={styles.paper}>
            <List
              className={clsx(classes.list)}
              style={styles.list}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader className={clsx(classes.subHeader)} style={styles.subHeader}>
                  {subHeader}
                </ListSubheader>
              }
            >
              {menuItems && menuItems.map((item) => (
                <MenuItem
                  key={item[primaryKey]}
                  title={item.name}
                  childrenData={item[childKey]}
                  updatedChildFun={handleClick}
                  fullData={item}
                  primaryKey={primaryKey}
                  childKey={childKey}
                  isCreate={isCreate}
                  onEditItem={() => {
                    return onEditItem(item);
                  }}
                  OnEditChildItems={OnEditChildItems}
                  onDeleteItem={() => onDeleteClick(item)}
                  deleteChildFun={onDeleteClick}
                  className={item.isDelete && classes.listItemText}
                  style={styles.listItemText}
                />
              ))}
              {isCreate && (
                <Button 
                  className={clsx(classes.addMoreButton)} 
                  variant="text" 
                  startIcon={<Icon>add</Icon> }
                  onClick={addNewItem}
                >
                  Add More
                </Button>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popover>
    </div>
    
  );
};

NestedDropdownMenu.defaultProps = {
  primaryKey: 'id',
  childKey: 'children',
  isCreate: false,
};

NestedDropdownMenu.propTypes = {
  data: PropTypes.array.isRequired,
  onAddNewItem: PropTypes.func.isRequired,
  primaryKey: PropTypes.string,
  childKey: PropTypes.string,
  isCreate: PropTypes.bool,
  styles: PropTypes.object,
  onEditItem:PropTypes.func,
  onDeleteItem:PropTypes.func,
  iconTitle:PropTypes.string,
  icon:PropTypes.string,
  className:PropTypes.object,
  isOpen:PropTypes.bool,
  subHeader: PropTypes.string
};

export default React.memo(NestedDropdownMenu);
