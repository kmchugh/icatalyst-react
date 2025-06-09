import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/styles';
import clsx from 'clsx';

const Root = styled('div')(({ theme }) => ({
  display : 'flex',
  flexDirection : 'row',
  alignItems: 'center',
  overflow: 'hidden',
  paddingLeft: theme.spacingNum(1),
  paddingRight: theme.spacingNum(1)
}));

const CommandPanelItem = ({
  className,
  style = {},
  children
})=>{

  return (
    <Root
      className={clsx(className)}
      style={{...style}}
    >
      {children}
    </Root>
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
