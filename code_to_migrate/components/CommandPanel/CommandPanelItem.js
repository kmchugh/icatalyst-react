import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'row',
      alignItems: 'center',
      overflow: 'hidden',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  };
});

const CommandPanelItem = ({
  className,
  style = {},
  children
})=>{
  const styles = useStyles();

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      {children}
    </div>
  );
};

CommandPanelItem.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default CommandPanelItem;
