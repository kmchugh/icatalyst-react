import React from 'react';
import {NavLink} from 'react-router-dom';

// eslint-disable-next-line
const NavLinkAdapter = React.forwardRef((props, ref) => {
  return (
    <NavLink innerRef={ref} {...props} />
  );
});

export default NavLinkAdapter;
