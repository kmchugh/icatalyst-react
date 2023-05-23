import React, {useEffect, useState} from 'react';

import {
  ListSubheader,
  List,
  Popover,
  Paper,
  ClickAwayListener,
  Button,
  Icon,
} from '@material-ui/core';
import { IconButton } from 'app/common/components';
import MenuItem from './component/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
// import { generateUUID } from '../../../utilities/generateUUID';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: 360, maxHeight: '50vh', overflow: 'auto'
  },
  list: {
    width: '100%', maxWidth: 360
  },
  subHeader : {
    background: theme.palette.background.paper
  },
  addMoreButton: {
    paddingLeft: theme.spacing(2),
    fontWeight: 400,
    fontSize: 12,
    color: theme.palette.text
  }
}));

const NestedDropdownMenu = ({ data, onAddNewItem, primaryKey, childKey, isCreate, style, ...props})=>{

  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(data);
  }, [data]);

  const handleClick = (data, id) => {
    // const currentData = findItemById(menuItems, id, data);
    onAddNewItem(id, data, menuItems);
    // setMenuItems(currentData);
  };

  const addNewItem = () => {
    // setMenuItems([ ...menuItems]);
    onAddNewItem(null, null, menuItems);
  };


  return (
    <div style={style}>
      <IconButton
        title="Add vocab"
        icon="g_translate"
        onClicked={(e)=>{
          setIsOpen(true);
          setAnchorEl(e.currentTarget);
        }}
      />
      <Popover open={open} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: -300 }}>
        <ClickAwayListener onClickAway={() => {
          setIsOpen(false);
          setAnchorEl(null);
        }}>
          <Paper className={classes.paper}>
            <List
              className={classes.list}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={<ListSubheader className={classes.subHeader}>Vocab Menu</ListSubheader>}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item[primaryKey]}
                  title={item.title}
                  childrenData={item[childKey]}
                  updatedChildFun={handleClick}
                  fullData={item}
                  primaryKey={primaryKey}
                  childKey={childKey}
                  isCreate={isCreate}
                />
              ))}
              {isCreate && (
                <Button className={classes.addMoreButton} variant="text" startIcon={<Icon>add</Icon> } onClick={addNewItem}>
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
  style: PropTypes.object,
};

export default React.memo(NestedDropdownMenu);
