import React from 'react';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../utilities';


const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      display : 'flex',
      flexDirection : 'row',
      alignItems: 'center',
      overflow: 'hidden',
      paddingLeft: theme.spacingNum(1),
      paddingRight: theme.spacingNum(1)
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
      className={cxMui(styles.root, className)}
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
