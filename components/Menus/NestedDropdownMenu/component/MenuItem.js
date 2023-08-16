import React, { useState } from 'react';
import {
  Icon,
  ListItemText,
  Collapse,
  ListItem,
  Button,
  List,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '../../../IconButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  list: {
    paddingBlock: 0,
  },
  listItem: {
    paddingBlock: 0,
  },
  listItemText: {
    '& span': {
      fontSize: 16,
      fontWeight: 500,
    },
    marginTop : theme.spacing(1),
    marginBottom : theme.spacing(1)
  },
  collapse: {
    paddingLeft: theme.spacing(2),
  },
  addMoreButton: {
    fontWeight: 400,
    fontSize: 12,
    color: theme.palette.text,
  },
  deleteIcon: {
    marginRight : theme.spacing(1),
  },
  iconDiv: {
    display : 'flex',
    gap : '9px'
  }
}));

const MenuItem = ({
  title,
  childrenData,
  updatedChildFun,
  fullData,
  primaryKey,
  childKey,
  isCreate,
  onEditItem,
  OnEditChildItems,
  onDeleteItem,
  deleteChildFun,
  className,
  onClickItem,
  onChildClickItem,
  ...props
}) => {
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    updatedChildFun(childrenData, fullData[primaryKey]);
  };

  return (
    <>
      <ListItem className={clsx (classes.listItem,className)}>
        <ListItemText className={clsx (classes.listItemText)} primary={title} onClick={onClickItem}/>
        {isCreate && !fullData.isEditable && <div className={classes.iconDiv}> 
          <IconButton
            title='edit'
            icon='edit'
            size='small'
            onClick={onEditItem}
          />
          <IconButton
            size='small'
            icon='delete'
            color='primary'
            className={classes.deleteIcon}
            onClick={onDeleteItem}
          />
        </div>
        }
        
        <div onClick={() => setIsOpen(!isOpen)}>
          {(childrenData?.length > 0 || isCreate) && !fullData.isEditable  &&
          (isOpen ? <Icon >expand_less</Icon> : <Icon>expand_more</Icon>)}
        </div>
      </ListItem>
      <Collapse
        className={classes.collapse}
        in={isOpen}
        timeout='auto'
        unmountOnExit
      >
        {isOpen && (
          <>
            <List className={classes.list}>
              {childrenData && childrenData.map((item,index) => (
                <MenuItem
                  key={index}
                  title={item.name}
                  childrenData={item[childKey]}
                  updatedChildFun={updatedChildFun}
                  fullData={item}
                  primaryKey={primaryKey}
                  childKey={childKey}
                  isCreate={isCreate}
                  Childitem= {item}
                  onEditItem={() => {
                    return OnEditChildItems(item);
                  }}
                  OnEditChildItems={OnEditChildItems}
                  onDeleteItem={()=>deleteChildFun(item)}
                  deleteChildFun={deleteChildFun}
                  onClickItem={()=>onChildClickItem(item)}
                  onChildClickItem={onChildClickItem}

                />
              ))}
            </List>
            {isCreate && (
              <Button
                className={classes.addMoreButton}
                variant='text'
                startIcon={<Icon>add</Icon>}
                onClick={handleClick}
              >
                Add More
              </Button>
            )}
          </>
        )}
      </Collapse>
    </>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  childrenData: PropTypes.array,
  updatedChildFun: PropTypes.func.isRequired,
  fullData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
    isEditable: PropTypes.bool
  }),
  primaryKey: PropTypes.string,
  childKey: PropTypes.string,
  isCreate: PropTypes.bool,
  onEditItem:PropTypes.func,
  OnEditChildItems:PropTypes.func,
  onDeleteItem:PropTypes.func,
  deleteChildFun:PropTypes.func,
  onClickItem:PropTypes.func,
  onChildClickItem:PropTypes.func,
  className:PropTypes.string
};

export default React.memo(MenuItem);
