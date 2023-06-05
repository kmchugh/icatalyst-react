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
  },
  collapse: {
    paddingLeft: theme.spacing(2),
  },
  addMoreButton: {
    fontWeight: 400,
    fontSize: 12,
    color: theme.palette.text,
  },
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
  ...props
}) => {
  const classes = useStyles(props);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    updatedChildFun(childrenData, fullData[primaryKey]);
  };

  return (
    <>
      <ListItem className={classes.listItem} onClick={() => setIsOpen(!isOpen)}>
        <ListItemText className={classes.listItemText} primary={title} />
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
          onClick={onDeleteItem}
        />
        {(childrenData.length > 0 || isCreate) &&
          (isOpen ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>)}
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
              {childrenData.map((item) => (
                <MenuItem
                  key={item[primaryKey]}
                  title={item.title}
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
  childrenData: PropTypes.array.isRequired,
  updatedChildFun: PropTypes.func.isRequired,
  fullData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  }).isRequired,
  primaryKey: PropTypes.string,
  childKey: PropTypes.string,
  isCreate: PropTypes.bool,
  onEditItem:PropTypes.func,
  OnEditChildItems:PropTypes.func,
  onDeleteItem:PropTypes.func,
  deleteChildFun:PropTypes.func
};

export default React.memo(MenuItem);
